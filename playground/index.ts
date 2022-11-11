import { html } from 'lighterhtml';

import '@progress/kendo-theme-default';
import { Button, Popup, List } from '../src/index';

// let kendoBtn = new Button.KendoButton();
let kendoBtn = document.createElement('button', { is: 'kendo-button' }) as Button.KendoButton;
kendoBtn.setAttribute('text', 'Primary');
kendoBtn.setAttribute('fillmode', 'outline');
kendoBtn.themeColor = Button.ThemeColor.primary;
kendoBtn.icon = "gear";

let popup = new Popup.KendoPopup();
popup.appendChild(document.createElement('div'));
popup.appendChild(html.node`<div>
    <span>${'some expression here'}</span>
</div>`);
popup.anchor = kendoBtn;

const app = document.querySelector('#app')!;

app.appendChild(kendoBtn);
app.appendChild(popup);

kendoBtn.addEventListener('click', (ev) => {
    popup.toggle();
});

// Play around with DOM replacement 

// let list = document.createElement('ul', { is: 'kendo-list' }) as List.KendoList;
// list.dataSource = [];

// app.appendChild(list);

// list.remove();
// app.appendChild(list);
// app.removeChild(list.list!);
// app.appendChild(list);
// console.log(list);






