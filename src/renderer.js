import * as tacocat from './jspm_packages/npm/tacocat@1.0.0/tacocat.js';
import DataRow from './dataRow.js';
let installPrompt;
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
const reloadData = async () => {
    dataBody.innerHTML = `Loading...`;
    const data = await (await fetch("https://covidtracking.com/api/v1/states/current.json")).json();
    const stateData = await (await fetch("https://covidtracking.com/api/v1/states/info.json")).json();
    const statesHistorical = await (await fetch("https://covidtracking.com/api/v1/states/daily.json")).json();
    dataBody.innerHTML = ``;
    for(let state in data) {
        const stateHistorical = statesHistorical.filter(dataItem => dataItem.state == data[state].state);
        const stateInfo = stateData.find(dataItem => dataItem.state == data[state].state)
        tacocat.render(new DataRow({apiResult: data[state], stateInfo, stateHistorical}), dataBody);
    }
}

reloadDataBtn.addEventListener('click', reloadData);
mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-fab'))
reloadData();