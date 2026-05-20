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
        document.getElementById('t_s').value = 80;
        document.getElementById('t_a').value = 35;
        document.getElementById('wind_speed').value = 0.5;
        document.getElementById('wind_angle').value = 45;
        document.getElementById('i_t0').value = 1000;
        document.getElementById('y').value = 300;
        updateCableInfo();
 });

    const cableInfoDB = {
        'ACSR_243':              { d: '21.75 mm', t: '80 °C',  r: '0.118 mΩ'  },
        'ACSS_FLICKER':          { d: '21.49 mm', t: '250 °C', r: '0.114 mΩ'  },
        'ACCC_LISBON':           { d: '21.79 mm', t: '200 °C', r: '0.089 mΩ'  },

        '122-AL1/20-ST1A':       { d: '15.50 mm', t: '80 °C',  r: '0.2376 mΩ' },
        '119-AL1/42-ST1A':       { d: '16.50 mm', t: '80 °C',  r: '0.2435 mΩ' },
        '122-AL1/71-ST1A':       { d: '18.00 mm', t: '80 °C',  r: '0.2364 mΩ' },
        '183-AL1/43-ST1A':       { d: '19.50 mm', t: '80 °C',  r: '0.1576 mΩ' },
        '184-AL1/30-ST1A':       { d: '19.00 mm', t: '80 °C',  r: '0.1571 mΩ' },
        '212-AL1/49-ST1A':       { d: '21.00 mm', t: '80 °C',  r: '0.1363 mΩ' },
        '243-AL1/39-ST1A':       { d: '21.80 mm', t: '80 °C',  r: '0.1188 mΩ' },
        '352-AL1/59-ST1A':       { d: '26.50 mm', t: '80 °C',  r: '0.0821 mΩ' },
        '362-AL1/59-ST1A':       { d: '26.70 mm', t: '80 °C',  r: '0.0798 mΩ' },
        '382-AL1/49-ST1A':       { d: '27.00 mm', t: '80 °C',  r: '0.0758 mΩ' },
        '430-AL1/100-ST1A':      { d: '22.90 mm', t: '80 °C',  r: '0.0673 mΩ' },
        '434-AL1/56-ST1A':       { d: '28.80 mm', t: '80 °C',  r: '0.0666 mΩ' },
        '490-AL1/64-ST1A':       { d: '30.60 mm', t: '80 °C',  r: '0.0590 mΩ' },
        '565-AL1/72-ST1A':       { d: '32.90 mm', t: '80 °C',  r: '0.0512 mΩ' },
        '679-AL1/86-ST1A':       { d: '36.00 mm', t: '80 °C',  r: '0.0426 mΩ' },
        '758-AL1/43-ST1A':       { d: '36.50 mm', t: '80 °C',  r: '0.0382 mΩ' },

        '185-AL1/43-ST6C':       { d: '19.60 mm', t: '80 °C',  r: '0.1565 mΩ' },
        '326-AL1/86-ST6C':       { d: '26.40 mm', t: '80 °C',  r: '0.0889 mΩ' },
        '362-AL1/59-ST6C':       { d: '26.70 mm', t: '80 °C',  r: '0.0798 mΩ' },
        '490-AL1/64-ST6C':       { d: '30.60 mm', t: '80 °C',  r: '0.0590 mΩ' },

        '185-AL4/43-ST6C':       { d: '19.60 mm', t: '80 °C',  r: '0.1805 mΩ' },
        '234-AL4/55-ST6C':       { d: '22.10 mm', t: '80 °C',  r: '0.1426 mΩ' },

        '66-A20SA':              { d: '10.50 mm', t: '80 °C',  r: '1.3102 mΩ' },
        '93-A20SA':              { d: '12.50 mm', t: '80 °C',  r: '0.9245 mΩ' },

        '24-AL1/4-ST1A':         { d: '6.72 mm',  t: '80 °C',  r: '1.2120 mΩ' },
        '37-AL1/6-ST1A':         { d: '8.40 mm',  t: '80 °C',  r: '0.7757 mΩ' },
        '47-AL1/8-ST1A':         { d: '9.45 mm',  t: '80 °C',  r: '0.6129 mΩ' },
        '66-AL1/11-ST1A':        { d: '11.40 mm', t: '80 °C',  r: '0.4365 mΩ' },
        '92-AL1/16-ST1A':        { d: '13.58 mm', t: '80 °C',  r: '0.3147 mΩ' },
        '128-AL1/22-ST1A':       { d: '16.00 mm', t: '80 °C',  r: '0.2263 mΩ' },

        '42-AL1/7-ST1A':         { d: '9.00 mm',  t: '80 °C',  r: '0.6757 mΩ' },
        '42-AL1/25-ST1A':        { d: '10.60 mm', t: '80 °C',  r: '0.6817 mΩ' },
        '72-AL1/11-ST1A':        { d: '12.00 mm', t: '80 °C',  r: '0.4028 mΩ' },
        'AlFe 70/11-1':          { d: '11.70 mm', t: '80 °C',  r: '0.4332 mΩ' },
        '100-AL1/25-ST1A':       { d: '14.60 mm', t: '80 °C',  r: '0.2891 mΩ' },
        '110-AL1/22-ST1A':       { d: '14.96 mm', t: '80 °C',  r: '0.2618 mΩ' },
        '143-AL1/25-ST1A':       { d: '16.96 mm', t: '80 °C',  r: '0.2014 mΩ' },
};

    function updateCableInfo() {
    const info = cableInfoDB[document.getElementById('conductorSelector').value];
    if (info) {
    document.getElementById('info_diameter').value = info.d;
    document.getElementById('info_maxtemp').value = info.t;
    document.getElementById('info_rdc').value = info.r;

    document.getElementById('t_s').value = parseFloat(info.t);
}
}
    updateCableInfo();

    async function sendCalculationRequest() {
     const t_s = parseFloat(document.getElementById('t_s').value);
     const t_a = parseFloat(document.getElementById('t_a').value);
     const wind_speed = parseFloat(document.getElementById('wind_speed').value);
     const wind_angle = parseFloat(document.getElementById('wind_angle').value);
     const i_t0 = parseFloat(document.getElementById('i_t0').value);
     const y = parseFloat(document.getElementById('y').value);

     if ([t_s, t_a, wind_speed, wind_angle, i_t0, y].some(isNaN)) {
         document.getElementById('resultOutput').innerText = "Fill all fields!";
         document.getElementById('resultOutput').style.color = "#FF4242";
         return;
     }

     const requestBody = {
         selection: document.getElementById('conductorSelector').value,
         enviroment: { t_s, t_a, wind_speed, wind_angle_of_attack: wind_angle, i_t0, y }
     };

     try {
         const response = await fetch('/api/calculate', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(requestBody)
         });

         if (!response.ok) {
             document.getElementById('resultOutput').innerText = "Fill all fields!";
             document.getElementById('resultOutput').style.color = "#FF4242";
             return;
         }

         const data = await response.json();

         if (data.slr === 0) {
             document.getElementById('resultOutput').innerText = "Raise temp!";
             document.getElementById('resultOutput').style.color = "#FF4242";
             return;
         }

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

    const presets = [];

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
    item.innerHTML = `<span>${p.name} #${i + 1}</span><button onclick="loadPreset(${i})">Load</button>`;
    list.appendChild(item);
});
}