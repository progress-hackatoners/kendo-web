import '../../../src/index';

let count = 0;

const span = document.querySelector('#sizeText');
const kendoButton = document.querySelector('#btn') as any;
const kendoDDL = document.querySelector('#ddl') as any;

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