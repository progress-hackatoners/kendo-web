var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html } from 'lighterhtml';
import { component, attr } from './decorators';
var States;
(function (States) {
    States["Selected"] = "k-selected";
    States["Focused"] = "k-focused";
})(States || (States = {}));
let KendoList = class KendoList extends HTMLUListElement {
    _dataSource;
    _dataTextField = 'text';
    _dataValueField = 'value';
    _rendered;
    _value;
    selectedItemElm;
    items = [];
    list;
    set value(val) {
        this._value = val;
    }
    get value() {
        return this._value;
    }
    set dataSource(val) {
        this._dataSource = val;
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataTextField(val) {
        this._dataTextField = val;
    }
    get dataTextField() {
        return this._dataTextField;
    }
    set dataValueField(val) {
        this._dataValueField = val;
    }
    get dataValueField() {
        return this._dataValueField;
    }
    constructor() {
        super();
    }
    async connectedCallback() {
        if (!this._rendered) {
            this.render();
            this.events();
        }
    }
    disconnectedCallback() {
        if (this.list) {
            const parent = this.list.parentElement || this.list.ownerDocument.body;
            const nextElm = this.list.nextElementSibling;
            parent.insertBefore(this, nextElm);
            this.list.remove();
            this.removeEventListener('click', this._click);
            delete this.list;
            delete this._rendered;
        }
    }
    render() {
        this._rendered = true;
        const parent = this.parentElement || this.ownerDocument.body;
        const nextElm = this.nextElementSibling;
        this.classList.add('k-list-ul');
        this.setAttribute('role', 'listbox');
        this.list = html.node `<div class='k-list k-list-md'>
            <div class='k-list-content k-list-scroller' style='height: 200px;'>
                ${this}
            </div>
        </div>`;
        if (parent && nextElm) {
            parent.insertBefore(this.list, nextElm);
        }
        else if (parent) {
            parent.appendChild(this.list);
        }
    }
    signal(prop) {
        switch (prop) {
            case 'dataSource':
                this.bind();
                break;
            case 'value':
                this._selectItem();
                break;
            default:
                break;
        }
    }
    bind() {
        let ds = this.dataSource;
        this.items = [];
        this.innerHTML = '';
        if (ds instanceof Promise) {
            ds.then((data) => {
                data.forEach(this._createItem.bind(this));
                this._selectItem();
                this._dispatchDataBound();
            });
        }
        else if (Array.isArray(ds)) {
            ds.forEach(this._createItem.bind(this));
            this._selectItem();
            this._dispatchDataBound();
        }
        else if (!!ds) {
            ds = ds.replace(/\[|\]|\'|\ /g, '').split(',');
            const first = ds[0];
            if (!first) {
                return;
            }
            if (typeof first === 'object' &&
                !Array.isArray(first)) {
                ds.forEach(this._createItem.bind(this));
                this._selectItem();
                this._dispatchDataBound();
            }
            else {
                ds.forEach((d) => {
                    const elm = new KendoListItem();
                    elm.text = d;
                    elm.value = d;
                    this.items.push(elm);
                    this.appendChild(elm);
                });
                this._selectItem();
                this._dispatchDataBound();
            }
            ;
        }
    }
    events() {
        this.addEventListener('click', this._click, false);
    }
    _click(ev) {
        let target = ev.target;
        target.selected = true;
        if (this.value !== target.value) {
            if (this.selectedItemElm) {
                this.selectedItemElm.selected = false;
            }
            this.selectedItemElm = target;
            this.value = target.value;
            this._dispatchChange();
        }
    }
    _createItem(d) {
        const elm = new KendoListItem();
        elm.text = d[this.dataTextField];
        elm.value = d[this.dataValueField];
        this.items.push(elm);
        this.appendChild(elm);
    }
    _dispatchChange() {
        let event = new CustomEvent('change', {
            detail: {
                item: this.selectedItemElm,
                text: this.selectedItemElm.text,
                value: this.selectedItemElm.value
            }
        });
        this.dispatchEvent(event);
    }
    _selectItem() {
        let elm = this.items.find(i => i.value === this.value);
        if (elm) {
            if (this.selectedItemElm) {
                this.selectedItemElm.selected = false;
            }
            this.selectedItemElm = elm;
            this.selectedItemElm.selected = true;
        }
    }
    _dispatchDataBound() {
        let event = new CustomEvent('dataBound');
        this.dispatchEvent(event);
    }
};
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoList.prototype, "value", null);
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoList.prototype, "dataSource", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoList.prototype, "dataTextField", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoList.prototype, "dataValueField", null);
KendoList = __decorate([
    component('kendo-list', { extends: 'ul' }),
    __metadata("design:paramtypes", [])
], KendoList);
export { KendoList };
let KendoListItem = class KendoListItem extends HTMLLIElement {
    textElm;
    _text;
    _value;
    _selected = false;
    set text(val) {
        this._text = val;
    }
    get text() {
        return this._text;
    }
    set selected(val) {
        this._selected = val;
    }
    get selected() {
        return this._selected;
    }
    set value(val) {
        this._value = val;
    }
    get value() {
        return this._value;
    }
    constructor() {
        super();
        this.classList.add("k-list-item");
        this.setAttribute('role', 'option');
        this.textElm = html.node `<span class="k-list-item-text"></span>`;
        this.textElm.innerText = this.text;
        this.appendChild(this.textElm);
        this.textElm.addEventListener('click', (ev) => {
            const clickEvent = new MouseEvent('click', ev);
            this.dispatchEvent(clickEvent);
            ev.stopPropagation();
        });
    }
    async connectedCallback() {
    }
    signal(prop) {
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
};
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoListItem.prototype, "text", null);
__decorate([
    attr(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], KendoListItem.prototype, "selected", null);
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoListItem.prototype, "value", null);
KendoListItem = __decorate([
    component('kendo-list-item', { extends: 'li' }),
    __metadata("design:paramtypes", [])
], KendoListItem);
