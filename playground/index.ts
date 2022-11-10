import '@progress/kendo-theme-default';
import { KendoButton } from '../src/index';

// let kendoBtn = new Kendo.KendoButton.KendoButton();
let kendoBtn = document.createElement('button', { is: 'kendo-button' }) as KendoButton.KendoButton;
kendoBtn.setAttribute('text', 'Primary');
kendoBtn.setAttribute('fillmode', 'outline');
kendoBtn.themeColor = KendoButton.ThemeColor.primary;


const app = document.querySelector('#app')!;

app.appendChild(kendoBtn);




