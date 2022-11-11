import { html } from 'lighterhtml';
import { component, attr } from './decorators';

const enum States {
    Selected = "k-selected",
    Focused = "k-focused"
}

@component('kendo-list', { extends: 'ul' })
export class KendoList extends HTMLUListElement {
    private _dataSource: any;
    private _dataTextField: string = 'text';
    private _dataValueField: string = 'value';
    private _rendered?: boolean;
    private _value?: string;

    selectedItem?: KendoListItem;

    items: Array<HTMLElement> = [];
    
    public list?: HTMLElement;

    @attr()
    set value(val: any) {    
        this._dispatchChange();    
        this._value = val;
    }

    get value() {
        return this._value!;
    }

    @attr()
    set dataSource (val: any) {
        this._dataSource = val;
    }

    get dataSource() {
        return this._dataSource;
    }

    @attr()
    set dataTextField (val: string) {
        this._dataTextField = val;
    }

    get dataTextField() {
        return this._dataTextField;
    }

    @attr()
    set dataValueField (val: string) {
        this._dataValueField = val;
    }

    get dataValueField() {
        return this._dataValueField;
    }

    constructor() {
        super();
    }

    async connectedCallback() {
        if(!this._rendered) {
            this.render();
            this.events();
        }
    }

    disconnectedCallback() {
        if(this.list){
            const parent = this.list.parentElement! || this.list.ownerDocument.body;
            const nextElm = this.list.nextElementSibling!;

            parent.insertBefore(this, nextElm);
            this.list.remove();

            this.removeEventListener('click', this._click);

            delete this.list;
            delete this._rendered;
        }
    }

    render() {
        this._rendered = true;
        const parent = this.parentElement! || this.ownerDocument.body;
        const nextElm = this.nextElementSibling!;
        this.classList.add('k-list-ul');
        
        this.list = html.node`<div class='k-list k-list-md'>
            <div class='k-list-content k-list-scroller'>
                ${this}
                This is the list!
            </div>
        </div>`;
        
        if(parent && nextElm) {
            parent.insertBefore(this.list, nextElm);
        } else if (parent) {
            parent.appendChild(this.list);        
        }
    }

    signal(prop: string) {
        switch (prop) {
            case 'dataSource':
                this.bind();
                break;
            default:
                break;
        }
    }   

    bind() {
        if (this.dataSource instanceof Promise) {
            this.dataSource.then((data) => {
                data.forEach((d: any) => {
                    let elm = new KendoListItem();
                    elm.text = d[this.dataTextField];
                    elm.value = d[this.dataValueField];
                    this.items.push(elm);
                    this.appendChild(elm);
                });
            });
        }
    }

    events() {
        this.addEventListener('click', this._click, false);
    }

    _click(ev: any) {
        let target = ev.target as KendoListItem;
        target.selected = true;

        if(this.selectedItem) {
            this.selectedItem.selected = false;
        }

        if(this.value !== target.value) {
            this.selectedItem = target;
            this.value = target.value;
        }
    }

    _dispatchChange() {
        let event = new CustomEvent('change', {
            detail: {
                item: this.selectedItem,
                text: this.selectedItem!.text,
                value: this.selectedItem!.value
            }
        });

        this.dispatchEvent(event);
    }
}

@component('kendo-list-item', { extends: 'li' })
class KendoListItem extends HTMLLIElement {
    private textElm: HTMLElement;
    private _text?: string;
    private _value?: string;
    private _selected: boolean = false;

    @attr()
    set text(val: string) {
        this._text = val;
    }

    get text() {
        return this._text!;
    }

    @attr()
    set selected(val: boolean) {
        this._selected = val;
    }

    get selected() {
        return this._selected;
    }

    @attr()
    set value(val: any) {
        this._value = val;
    }

    get value() {
        return this._value!;
    }

    constructor() {
        super();
        this.classList.add("k-list-item");
        this.textElm = html.node`<span class="k-list-item-text">${this.text}</span>`
        this.appendChild(this.textElm);
        
        this.textElm.addEventListener('click', (ev) => {
            const clickEvent = new MouseEvent('click', ev);
            this.dispatchEvent(clickEvent);
            ev.stopPropagation();
        })
    }

    async connectedCallback() {

    }

    signal(prop: string) {
        switch (prop) {
            case 'text':
                this.textElm.innerText = this.text;
                break;
            case 'selected':
                this.classList.toggle(States.Selected, this.selected);
                break;
            default:
                break;
        }
    }   
}
