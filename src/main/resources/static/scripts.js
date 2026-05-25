const translations = {
    en: {
        title: 'Static Ampacity Calculator',
        tab1: 'Data & Preferences',
        temperature: 'Temperature:',
        action: 'Action:',
        calc: 'Calculate',
        toDefault: 'To default:',
        reset: 'Reset',
        totalAmpacity: 'Total ampacity:',
        tab2: 'Meteodata & Weather',
        airTemp: 'Air Temp (°C):',
        wind: 'Wind (m/s):',
        angle: 'Angle (°):',
        solar: 'Solar (W/m²):',
        elevation: 'Elevation (m):',
        tab3: 'Cable Configuration',
        material: 'Material:',
        diameter: 'Diameter:',
        outDiameter: 'Out diameter:',
        maxTemp: 'Max Temp:',
        tempCoef: 'Temperature coefficient:',
        resistance: 'Resistance (20°C):',
        surface: 'Surface Properties',
        emissivity: 'Emissivity:',
        absorptivity: 'Absorptivity:',
        cableSelected: 'Cable selected:',
        saves: 'Saves',
        saveCurrent: 'Save current',
        history: 'History',
        pressCalc: 'Calculate 2 times to reveal chart',
        info: 'Info',
        infoStandards: 'Standarts: CIGRE 601',
        documentation: 'Read the documentation: nolink.com',
        close: 'Close',
    },
    sk: {
        title: 'Kalkulátor statickej ampacity',
        tab1: 'Dáta & Nastavenia',
        temperature: 'Teplota:',
        action: 'Akcia:',
        calc: 'Vypočítať',
        toDefault: 'Predvolené:',
        reset: 'Reset',
        totalAmpacity: 'Celková ampacita:',
        tab2: 'Meteodata & Počasie',
        airTemp: 'Teplota vzduchu (°C):',
        wind: 'Vietor (m/s):',
        angle: 'Uhol (°):',
        solar: 'Slnečné žiar. (W/m²):',
        elevation: 'Nadmorská výška (m):',
        tab3: 'Konfigurácia kábla',
        material: 'Materiál:',
        diameter: 'Priemer:',
        outDiameter: 'Vonkajší priemer:',
        maxTemp: 'Max. teplota:',
        tempCoef: 'Teplotný koeficient:',
        resistance: 'Odpor (20°C):',
        surface: 'Vlastnosti povrchu',
        emissivity: 'Emisivita:',
        absorptivity: 'Absorptivita:',
        cableSelected: 'Vybraný kábel:',
        saves: 'Uložené',
        saveCurrent: 'Uložiť aktuálne',
        history: 'História',
        pressCalc: 'Vypočítajte dvakrát, aby sa zobrazil graf',
        info: 'Informácie',
        infoStandards: 'Normy: CIGRE 601',
        documentation: 'Prečítať dokumentáciu: nolink.com',
        close: 'Zavrieť',
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
}

const history = [];

function updateChart(value) {
    history.push(value);
    document.getElementById('chartEmpty').style.display = 'none';

    const svg = document.getElementById('historyChart');
    const W = svg.getBoundingClientRect().width || svg.parentElement.clientWidth - 40;
    const H = svg.getBoundingClientRect().height || 200;

    const padLeft = 55;
    const padBottom = 30;
    const padTop = 20;
    const chartW = W - padLeft;
    const chartH = H - padBottom - padTop;

    const max = Math.max(...history) * 1.2;
    const step = history.length > 1 ? chartW / (history.length - 1) : chartW;

    svg.querySelectorAll('.auto-label').forEach(el => el.remove());

    const points = history.map((v, i) => {
        const x = padLeft + i * step;
        const y = padTop + chartH - (v / max) * chartH;
        return `${x},${y}`;
    }).join(' ');
    document.getElementById('chartLine').setAttribute('points', points);

    [1, 0.5, 0].forEach(ratio => {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', 2);
        t.setAttribute('y', padTop + chartH * (1 - ratio) + 5);
        t.setAttribute('fill', '#DEDEDE');
        t.setAttribute('font-size', '14');
        t.setAttribute('class', 'auto-label');
        t.textContent = Math.round(max * ratio) + ' A';
        svg.appendChild(t);
    });

    history.forEach((v, i) => {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', padLeft + i * step - 4);
        t.setAttribute('y', H - 6);
        t.setAttribute('fill', '#DEDEDE');
        t.setAttribute('font-size', '14');
        t.setAttribute('class', 'auto-label');
        t.textContent = i + 1;
        svg.appendChild(t);
    });
}

function showTable(num, btn) {
    document.querySelectorAll('.table-content').forEach(t => t.style.display = 'none');
    document.getElementById('table' + num).style.display = 'block';
    document.querySelectorAll('.my-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

document.getElementById('info-btn').addEventListener('click', () => document.getElementById('info').classList.add('open'));
document.getElementById('close-i').addEventListener('click', () => document.getElementById('info').classList.remove('open'));

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('t_s').value = 60;
    document.getElementById('t_a').value = 35;
    document.getElementById('wind_speed').value = 0.5;
    document.getElementById('wind_angle').value = 45;
    document.getElementById('i_t0').value = 1000;
    document.getElementById('y').value = 300;
    document.getElementById('emissivity').value = 0.5;
    document.getElementById('absorptivity').value = 0.5;
    updateCableInfo();
});

const cableInfoDB = {
    'ACSR_243':          { d: '21.75 mm', sd: '3.45 mm', t: '80 °C',  r: '0.1181 mΩ', a: '0.004' },
    'ACSS_FLICKER':      { d: '21.49 mm', sd: '3.58 mm', t: '250 °C', r: '0.1142 mΩ', a: '0.004' },
    'ACCC_LISBON':       { d: '21.79 mm', sd: '3.67 mm', t: '200 °C', r: '0.0887 mΩ', a: '0.00403' },

    '122-AL1/20-ST1A':   { d: '15.5 mm', sd: '2.44 mm', t: '80 °C',  r: '0.2376 mΩ', a: '0.00403' },
    '119-AL1/42-ST1A':   { d: '16.5 mm', sd: '2.05 mm', t: '80 °C',  r: '0.2435 mΩ', a: '0.00403' },
    '122-AL1/71-ST1A':   { d: '18.0 mm', sd: '3.60 mm', t: '80 °C',  r: '0.2364 mΩ', a: '0.00403' },
    '183-AL1/43-ST1A':   { d: '19.5 mm', sd: '2.79 mm', t: '80 °C',  r: '0.1576 mΩ', a: '0.00403' },
    '184-AL1/30-ST1A':   { d: '19.0 mm', sd: '3.00 mm', t: '80 °C',  r: '0.1571 mΩ', a: '0.00403' },
    '212-AL1/49-ST1A':   { d: '21.0 mm', sd: '3.00 mm', t: '80 °C',  r: '0.1363 mΩ', a: '0.00403' },
    '243-AL1/39-ST1A':   { d: '21.8 mm', sd: '3.45 mm', t: '80 °C',  r: '0.1188 mΩ', a: '0.00403' },
    '352-AL1/59-ST1A':   { d: '26.5 mm', sd: '4.00 mm', t: '80 °C',  r: '0.0821 mΩ', a: '0.00403' },
    '362-AL1/59-ST1A':   { d: '26.7 mm', sd: '4.21 mm', t: '80 °C',  r: '0.0798 mΩ', a: '0.00403' },
    '382-AL1/49-ST1A':   { d: '27.0 mm', sd: '3.00 mm', t: '80 °C',  r: '0.0758 mΩ', a: '0.00403' },
    '430-AL1/100-ST1A':  { d: '22.9 mm', sd: '4.27 mm', t: '80 °C',  r: '0.0673 mΩ', a: '0.00403' },
    '434-AL1/56-ST1A':   { d: '28.8 mm', sd: '3.20 mm', t: '80 °C',  r: '0.0666 mΩ', a: '0.00403' },
    '490-AL1/64-ST1A':   { d: '30.6 mm', sd: '3.40 mm', t: '80 °C',  r: '0.0590 mΩ', a: '0.00403' },
    '565-AL1/72-ST1A':   { d: '32.9 mm', sd: '3.65 mm', t: '80 °C',  r: '0.0512 mΩ', a: '0.00403' },
    '679-AL1/86-ST1A':   { d: '36.0 mm', sd: '4.00 mm', t: '80 °C',  r: '0.0426 mΩ', a: '0.00403' },
    '758-AL1/43-ST1A':   { d: '36.5 mm', sd: '4.12 mm', t: '80 °C',  r: '0.0382 mΩ', a: '0.00403' },

    '185-AL1/43-ST6C':   { d: '19.6 mm', sd: '2.80 mm', t: '80 °C',  r: '0.1565 mΩ', a: '0.00403' },
    '326-AL1/86-ST6C':   { d: '26.4 mm', sd: '3.60 mm', t: '80 °C',  r: '0.0889 mΩ', a: '0.00403' },
    '362-AL1/59-ST6C':   { d: '26.7 mm', sd: '4.21 mm', t: '80 °C',  r: '0.0798 mΩ', a: '0.00403' },
    '490-AL1/64-ST6C':   { d: '30.6 mm', sd: '3.40 mm', t: '80 °C',  r: '0.0590 mΩ', a: '0.00403' },

    '185-AL4/43-ST6C':   { d: '19.6 mm', sd: '2.80 mm', t: '80 °C',  r: '0.1805 mΩ', a: '0.00360' },
    '234-AL4/55-ST6C':   { d: '22.1 mm', sd: '3.15 mm', t: '80 °C',  r: '0.1426 mΩ', a: '0.00360' },

    '66-A20SA':          { d: '10.5 mm', sd: '2.10 mm', t: '80 °C',  r: '1.3102 mΩ', a: '0.00403' },
    '93-A20SA':          { d: '12.5 mm', sd: '2.50 mm', t: '80 °C',  r: '0.9245 mΩ', a: '0.00403' },

    '24-AL1/4-ST1A':     { d: '6.72 mm', sd: '2.24 mm', t: '80 °C',  r: '1.2120 mΩ', a: '0.00403' },
    '37-AL1/6-ST1A':     { d: '8.40 mm', sd: '2.80 mm', t: '80 °C',  r: '0.7757 mΩ', a: '0.00403' },
    '47-AL1/8-ST1A':     { d: '9.45 mm', sd: '3.15 mm', t: '80 °C',  r: '0.6129 mΩ', a: '0.00403' },
    '66-AL1/11-ST1A':    { d: '11.4 mm', sd: '1.80 mm', t: '80 °C',  r: '0.4365 mΩ', a: '0.00403' },
    '92-AL1/16-ST1A':    { d: '13.58 mm',sd: '2.12 mm', t: '80 °C',  r: '0.3147 mΩ', a: '0.00403' },
    '128-AL1/22-ST1A':   { d: '16.0 mm', sd: '2.50 mm', t: '80 °C',  r: '0.2263 mΩ', a: '0.00403' },

    '42-AL1/7-ST1A':     { d: '9.00 mm', sd: '3.00 mm', t: '80 °C',  r: '0.6757 mΩ', a: '0.00403' },
    '42-AL1/25-ST1A':    { d: '10.6 mm', sd: '2.12 mm', t: '80 °C',  r: '0.6817 mΩ', a: '0.00403' },
    '72-AL1/11-ST1A':    { d: '12.0 mm', sd: '1.95 mm', t: '80 °C',  r: '0.4028 mΩ', a: '0.00403' },
    'AlFe 70/11-1':      { d: '11.7 mm', sd: '3.75 mm', t: '80 °C',  r: '0.4332 mΩ', a: '0.00403' },
    '100-AL1/25-ST1A':   { d: '14.6 mm', sd: '2.06 mm', t: '80 °C',  r: '0.2891 mΩ', a: '0.00403' },
    '110-AL1/22-ST1A':   { d: '14.96 mm',sd: '2.24 mm', t: '80 °C',  r: '0.2618 mΩ', a: '0.00403' },
    '143-AL1/25-ST1A':   { d: '16.96 mm',sd: '2.65 mm', t: '80 °C',  r: '0.2014 mΩ', a: '0.00403' },
};

function updateCableInfo() {
    const info = cableInfoDB[document.getElementById('conductorSelector').value];
    if (info) {
        document.getElementById('info_diameter').value = info.sd;
        document.getElementById('info_out_diameter').value = info.d;
        document.getElementById('info_maxtemp').value = info.t;
        document.getElementById('info_rdc').value = info.r;
        document.getElementById('info_temp_conf').value = info.a;
        document.getElementById('t_s').value = parseFloat(info.t);

    }
}

async function sendCalculationRequest() {
    const t_s = parseFloat(document.getElementById('t_s').value);
    const t_a = parseFloat(document.getElementById('t_a').value);
    const wind_speed = parseFloat(document.getElementById('wind_speed').value);
    const wind_angle = parseFloat(document.getElementById('wind_angle').value);
    const i_t0 = parseFloat(document.getElementById('i_t0').value);
    const y = parseFloat(document.getElementById('y').value);
    const emissivity = parseFloat(document.getElementById('emissivity').value);
    const absorptivity = parseFloat(document.getElementById('absorptivity').value);
    if ([t_s, t_a, wind_speed, wind_angle, i_t0, y, emissivity, absorptivity].some(isNaN)) {
        document.getElementById('resultOutput').innerText = "Fill all fields!";
        document.getElementById('resultOutput').style.color = "#FF4242";
        return;
    }

    const requestBody = {
        selection: document.getElementById('conductorSelector').value,
        enviroment: { t_s, t_a, wind_speed, wind_angle_of_attack: wind_angle, i_t0, y },
        emissivity: emissivity,
        absorptivity: absorptivity
    };

    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            document.getElementById('resultOutput').innerText = "Error! Check max. temp!";
            document.getElementById('resultOutput').style.color = "#FF4242";
            return;
        }

        const data = await response.json();

        const el = document.getElementById('resultOutput');
        el.innerText = data.slr.toFixed(2) + " A";
        el.style.color = "#17b36a";
        updateChart(data.slr);

    } catch (e) {
        console.error(e);
        document.getElementById('resultOutput').innerText = "Connection error!";
        document.getElementById('resultOutput').style.color = "#FF4242";
    }
}

const presets = JSON.parse(localStorage.getItem('ampacity_presets') || '[]');

function savePreset() {
    const preset = {
        name: new Date().toLocaleDateString('sk-SK'),
        t_s: document.getElementById('t_s').value,
        t_a: document.getElementById('t_a').value,
        wind_speed: document.getElementById('wind_speed').value,
        wind_angle: document.getElementById('wind_angle').value,
        i_t0: document.getElementById('i_t0').value,
        y: document.getElementById('y').value,
        cable: document.getElementById('conductorSelector').value
    };
    presets.push(preset);
    localStorage.setItem('ampacity_presets', JSON.stringify(presets));
    renderPresets();
}

function loadPreset(index) {
    const p = presets[index];
    document.getElementById('t_s').value = p.t_s;
    document.getElementById('t_a').value = p.t_a;
    document.getElementById('wind_speed').value = p.wind_speed;
    document.getElementById('wind_angle').value = p.wind_angle;
    document.getElementById('i_t0').value = p.i_t0;
    document.getElementById('y').value = p.y;
    document.getElementById('conductorSelector').value = p.cable;
    updateCableInfo();
}

function renderPresets() {
    const list = document.getElementById('presetList');
    list.innerHTML = '';
    presets.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'preset-item';
        item.innerHTML = `<span>${p.name} #${i + 1}</span>
                          <button onclick="loadPreset(${i})">Load</button>
                          <button onclick="deletePreset(${i})">✕</button>`;
        list.appendChild(item);
    });
}
function deletePreset(index) {
    presets.splice(index, 1);
    localStorage.setItem('ampacity_presets', JSON.stringify(presets));
    renderPresets();
}

renderPresets();
setLanguage(currentLang);
updateCableInfo();