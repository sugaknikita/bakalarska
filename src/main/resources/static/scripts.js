 const history = [];

    function updateChart(value) {
    history.push(value);
    document.getElementById('chartEmpty').style.display = 'none';

    const svg = document.getElementById('historyChart');
    const W = svg.clientWidth;
    const H = svg.clientHeight;

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
    ['table1', 'table2', 'table3'].forEach(id => {
        document.getElementById(id).querySelectorAll('input').forEach(input => input.value = '');
    });
});

    const cableInfoDB = {
    'ACSR_243':     { d: '21.75 mm', t: '80 °C',  r: '0.118 mΩ' },
    'ACSS_FLICKER': { d: '21.49 mm', t: '250 °C', r: '0.114 mΩ' },
    'ACCC_LISBON':  { d: '21.79 mm', t: '200 °C', r: '0.089 mΩ' }
};

    function updateCableInfo() {
    const info = cableInfoDB[document.getElementById('conductorSelector').value];
    if (info) {
    document.getElementById('info_diameter').value = info.d;
    document.getElementById('info_maxtemp').value  = info.t;
    document.getElementById('info_rdc').value      = info.r;
}
}
    updateCableInfo();

    async function sendCalculationRequest() {
    const requestBody = {
    selection: document.getElementById('conductorSelector').value,
    enviroment: {
    t_s: parseFloat(document.getElementById('t_s').value),
    t_a: parseFloat(document.getElementById('t_a').value),
    wind_speed: parseFloat(document.getElementById('wind_speed').value),
    wind_angle_of_attack: parseFloat(document.getElementById('wind_angle').value),
    i_t0: parseFloat(document.getElementById('i_t0').value),
    y: parseFloat(document.getElementById('y').value)
}
};

    try {
    const response = await fetch('/api/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
});

    if (!response.ok) { alert("Server error: " + response.status); return; }

    const data = await response.json();
    const el = document.getElementById('resultOutput');
    el.innerText = data.slr.toFixed(2) + " A";
    el.style.color = "#17b36a";
    updateChart(data.slr);
} catch (e) {
    console.error(e);
    alert("Connection error!");
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