import * as tacocat from './jspm_packages/npm/tacocat@1.0.0/tacocat.js';
import storage from './jspm_packages/npm/kv-storage-polyfill@2.0.0/dist/kv-storage-polyfill.mjs';
import DataRow from './dataRow.js';
import {hide, unhide} from './app.css.js';
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
window.addEventListener("beforeinstallprompt", async beforeInstallPromptEvent => {
    beforeInstallPromptEvent.preventDefault(); // Prevents immediate prompt display
  
    // Shows prompt after a user clicks an "install" button
    installButton.addEventListener("click", async function(mouseEvent) {
      // you should not use the MouseEvent here, obviously
      beforeInstallPromptEvent.prompt();
      if(beforeInstallPromptEvent.userChoice == 'accepted') {
          await storage.set('installed', true);
      }
    });
  
    if(!await storage.get('installed')) unhide(installButton); // Make button operable
  });
mdc.ripple.MDCRipple.attachTo(installButton);
reloadDataBtn.addEventListener('click', reloadData);
mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-fab'))
reloadData();