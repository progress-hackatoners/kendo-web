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
import { component, attr, sizingoptions } from './decorators';
import { KendoButton } from './button';
import { KendoPopup } from './popup';
import { KendoList } from './list';
import { Size } from './enums/size';
import { Rounded } from './enums/rounded';
import { FillMode } from './enums/fillmode';
import { ThemeColor } from './enums/themecolor';
import { StyleOption } from './enums/styleoption';
let KendoDropDownList = class KendoDropDownList extends HTMLInputElement {
    wrapperPrefix = `k-picker-`;
    roundedPrefix = 'k-rounded-';
    _dataSource;
    _rendered;
    _value;
    _text;
    _optionLabel;
    _dataTextField = 'text';
    _dataValueField = 'value';
    _size = "medium";
    _rounded = "medium";
    _fillMode = "solid";
    _themeColor = "base";
    _list;
    _button;
    _popup;
    _inputValue;
    wrapper;
    ariaLabel;
    set dataSource(val) {
        this._dataSource = val;
    }
    get dataSource() {
        return this._dataSource;
    }
    set value(val) {
        this._value = val;
    }
    get value() {
        return this._value;
    }
    set text(val) {
        this._text = val;
    }
    get text() {
        return this._text;
    }
    set optionLabel(val) {
        this._optionLabel = val;
    }
    get optionLabel() {
        return this._optionLabel;
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
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
    get rounded() {
        return this._rounded;
    }
    set rounded(value) {
        this._rounded = value;
    }
    get fillMode() {
        return this._fillMode;
    }
    set fillMode(value) {
        this._fillMode = value;
    }
    get themeColor() {
        return this._themeColor;
    }
    set themeColor(value) {
        this._themeColor = value;
    }
    constructor() {
        super();
        this._createList();
        this._createButton();
        this._createPopup();
        this._createInput();
        this.events();
    }
    connectedCallback() {
        if (!this._rendered) {
            this.render();
        }
    }
    events() {
        window.addEventListener('click', (args) => {
            if (!this.wrapper.contains(args.target)) {
                this._popup.hide();
            }
        });
    }
    render() {
        this._rendered = true;
        const parent = this.parentElement || this.ownerDocument.body;
        const nextElm = this.nextElementSibling;
        const listId = this.id + 'list-id';
        this.classList.add('k-hidden');
        this.setAttribute('aria-hidden', 'true');
        this.wrapper = html.node `<span role="combobox" tabindex="0" aria=${{ expanded: false, controls: listId }}>
            <span class="k-input-inner">
                ${this._inputValue}
            </span>
            ${this._button}
            ${this}
        </span>`;
        if (parent && nextElm) {
            parent.insertBefore(this.wrapper, nextElm);
        }
        else if (parent) {
            parent.appendChild(this.wrapper);
        }
        this.wrapper.classList.add('k-picker', 'k-dropdownlist', this.getPrefixed(Size[this.size]), this.getPrefixed(Rounded[this.rounded], { prefix: this.roundedPrefix }), this.getPrefixed(FillMode[this.fillMode]), this.getPrefixed(ThemeColor[this.themeColor], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` }));
        this._ariaLabel();
        this._popup.anchor = this.wrapper;
        this.wrapper.addEventListener('click', () => {
            this._popup.toggle();
        });
        this._list.setAttribute('id', listId);
        this._list.setAttribute('aria-label', this.ariaLabel + ' list');
    }
    disconnectedCallback() {
        if (this.wrapper) {
            const parent = this.wrapper.parentElement || this.wrapper.ownerDocument.body;
            const nextElm = this.wrapper.nextElementSibling;
            parent.insertBefore(this, nextElm);
            this.wrapper.remove();
            delete this.wrapper;
            delete this._rendered;
        }
    }
    signal(prop, newValue, oldValue) {
        switch (prop) {
            case 'dataSource':
                this._list.dataSource = newValue;
                break;
            case 'dataValueField':
                this._list.dataValueField = newValue;
                break;
            case 'dataTextField':
                this._list.dataTextField = newValue;
                break;
            case 'text':
                if (this._validateText(newValue)) {
                    this._inputValue.textContent = newValue;
                }
                break;
            case 'value':
                this._list.value = this.value;
                break;
            case StyleOption.Size:
            case StyleOption.Rounded:
            case StyleOption.FillMode:
            case StyleOption.ThemeColor:
                this.updateStyleOptions(prop, newValue, oldValue);
                break;
            default:
                break;
        }
    }
    _ariaLabel() {
        var inputElm = this, inputId = inputElm.getAttribute('id'), labelElm = document.querySelector(`label[for="${inputId}"]`), ariaLabel = inputElm.getAttribute('aria-label'), ariaLabelledBy = inputElm.getAttribute('aria-labelledby'), target = this.wrapper, labelId;
        if (ariaLabel) {
            this.ariaLabel = ariaLabel;
            target?.setAttribute('aria-label', ariaLabel);
        }
        else if (ariaLabelledBy) {
            target?.setAttribute('aria-labelledby', ariaLabelledBy);
            this.ariaLabel = document.querySelector('#' + ariaLabelledBy)?.textContent;
        }
        else if (labelElm) {
            labelId = labelElm.getAttribute('id') || this._generateLabelId(labelElm, inputId || 'kendo-ddl');
            target?.setAttribute('aria-labelledby', labelId);
            this.ariaLabel = labelElm.textContent;
        }
    }
    _createButton() {
        const button = new KendoButton();
        button.icon = 'arrow-s';
        button.size = this.size;
        button.themeColor = this.themeColor,
            button.rounded = this.rounded;
        button.fillMode = this.fillMode;
        button.classList.add('k-input-button');
        button.setAttribute('aria-hidden', 'true');
        button.setAttribute('tabindex', -1);
        this._button = button;
    }
    _createInput() {
        const value = this._validateValue(this.value) ? this.value : undefined;
        const text = this._validateText(this.text) ? this.text : undefined;
        if (value !== this.value) {
            this.value = value;
        }
        if (text !== this.text) {
            this.text = text;
        }
        this._inputValue = html.node `<span class="k-input-value-text">${text || this._optionLabel}</span>`;
    }
    _createList() {
        this._list = new KendoList();
        this._list.dataValueField = this.dataValueField;
        this._list.dataTextField = this.dataTextField;
        this._list.dataSource = this._dataSource;
        this._list.addEventListener('change', (args) => {
            this.value = args.detail.value;
            this.text = args.detail.text;
            this._popup.hide();
            let ev = new Event('change');
            this.dispatchEvent(ev);
        });
        this._list.addEventListener('dataBound', () => {
            const numValue = !isNaN(Number(this.value)) && typeof this.value !== "number";
            if (numValue) {
                this.value = Number(this.value);
            }
            this._list.value = this.value;
            this.text = this._list.selectedItemElm?.text;
        });
    }
    _createPopup() {
        this._popup = new KendoPopup();
        this.ownerDocument.body.appendChild(this._popup);
        this._popup.appendChild(this._list);
    }
    _generateLabelId(label, inputId) {
        var labelId = inputId + '-label-id';
        label.setAttribute('id', labelId);
        return labelId;
    }
    _validateValue(value) {
        const items = this._list.items;
        return items.some(i => i.value === value);
    }
    _validateText(value) {
        const items = this._list.items;
        return items.some(i => i.text === value);
    }
};
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoDropDownList.prototype, "dataSource", null);
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoDropDownList.prototype, "value", null);
__decorate([
    attr(false),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoDropDownList.prototype, "text", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoDropDownList.prototype, "optionLabel", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoDropDownList.prototype, "dataTextField", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoDropDownList.prototype, "dataValueField", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoDropDownList.prototype, "size", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoDropDownList.prototype, "rounded", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoDropDownList.prototype, "fillMode", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoDropDownList.prototype, "themeColor", null);
KendoDropDownList = __decorate([
    component('kendo-dropdown-list', { extends: 'input' }),
    sizingoptions(),
    __metadata("design:paramtypes", [])
], KendoDropDownList);
export { KendoDropDownList };
