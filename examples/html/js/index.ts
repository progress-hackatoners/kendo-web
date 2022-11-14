import '../../../src/index';

let count = 0;

const span = document.querySelector('#sizeText');
const kendoButton = document.querySelector('#btn') as any;
const kendoDDL = document.querySelector('#ddl') as any;

/* === Templating === */

/* --- Returning plain string --- */
kendoDDL.itemTemplate = (data) => `<span>
    <span style='font-weight: bold;'>${data.text}</span> 
    is with value 
    <span style='font-style: italic;'>${data.value}</span>
</span>`;

/* --- OR --- */

/* --- Returning a single element --- */
kendoDDL.itemTemplate = (data) => {
    const elm = document.createElement('span');

    elm.innerHTML =  `<span>
        <span style='font-weight: bold;'>${data.text}</span> 
        is with value 
        <span style='font-style: italic;'>${data.value}</span>
    </span>`;

    return elm;
};

/* --- OR --- */

/* --- Returning new document fragment --- */
kendoDDL.itemTemplate = (data) => {
    const fragment = document.createDocumentFragment();
    const elm = document.createElement('span');

    fragment.appendChild(elm);

    elm.innerHTML =  `<span>
        <span style='font-weight: bold;'>${data.text}</span> 
        is with value 
        <span style='font-style: italic;'>${data.value}</span>
    </span>`;

    return fragment;
};

/* === End === */

const sizes = [
    { text: 'Small', value: 'small'},
    { text: 'Medium', value: 'medium'},
    { text: 'Large', value: 'large'}
];

kendoDDL.dataSource = sizes;

kendoButton?.addEventListener('click', (ev) => {
    kendoButton.text = `Count is: ${++count}`
})

kendoDDL?.addEventListener('change', (ev) => {
    const newSize = ev.target.value;
    kendoButton.size = newSize;
    span!.innerHTML = `Button is ${newSize}`;
});