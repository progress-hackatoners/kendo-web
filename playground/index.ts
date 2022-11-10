import '@progress/kendo-theme-default';
import { Button } from '../src/index';

// let kendoBtn = new Button.KendoButton();
let kendoBtn = document.createElement('button', { is: 'kendo-button' }) as Button.KendoButton;
kendoBtn.setAttribute('text', 'Primary');
kendoBtn.setAttribute('fillmode', 'outline');
kendoBtn.themeColor = Button.ThemeColor.primary;
kendoBtn.icon = "gear";
kendoBtn.addEventListener('iconClick', (ev) => {
    console.log(ev);
});


const app = document.querySelector('#app')!;

app.appendChild(kendoBtn);




