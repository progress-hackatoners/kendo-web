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

import type { SizeKey } from './enums/size';
import type { RoundedKey } from './enums/rounded';
import type { FillModeKey } from './enums/fillmode';
import type { ThemeColorKey } from './enums/themecolor';


@component('kendo-dropdown-list', { extends: 'input' })
@sizingoptions()
export class KendoDropDownList extends HTMLInputElement {
    private wrapperPrefix = `k-picker-`;
    private roundedPrefix = 'k-rounded-';

    private _dataSource: any;
    private _rendered?: boolean;
    private _value?: string;
    private _text?: string;
    private _optionLabel?: string;
    private _dataTextField: string = 'text';
    private _dataValueField: string = 'value';
    private _size: SizeKey = "medium" as SizeKey;
    private _rounded: RoundedKey = "medium" as RoundedKey;
    private _fillMode: FillModeKey = "solid" as FillModeKey;
    private _themeColor: ThemeColorKey = "base" as ThemeColorKey;

    private _list: KendoList;
    private _button: KendoButton;
    private _popup: KendoPopup;
    private _inputValue: Element;

    public wrapper?: HTMLElement;

    @attr()
    set dataSource (val: any) {
        this._dataSource = val;
    }

    get dataSource() {
        return this._dataSource;
    }

    @attr()
    set value (val: any) {
        this._value = val;
    }

    get value() {
        return this._value!;
    }

    @attr(false)
    set text (val: any) {
        this._text = val;
    }

    get text() {
        return this._text!;
    }

    @attr()
    set optionLabel (val: string) {
        this._optionLabel = val;
    }

    get optionLabel() {
        return this._optionLabel;
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

    @attr()
    get size() {
        return this._size!;
    }
    set size(value: SizeKey) {
        this._size = value;
    }

    @attr()
    get rounded() {
        return this._rounded!;
    }
    set rounded(value: RoundedKey) {
        this._rounded = value;
    }

    @attr()
    get fillMode() {
        return this._fillMode!;
    }
    set fillMode(value: FillModeKey) {
        this._fillMode = value;
    }

    @attr()
    get themeColor() {
        return this._themeColor!;
    }
    set themeColor(value: ThemeColorKey) {
        this._themeColor = value;
    }

    constructor() {
        super();

        this._createList();
        this._createButton();
        this._createPopup();
        this._createInput();
    }

    async connectedCallback() {
        if(!this._rendered) {
            this.render();
        }
    }

    render() {
        this._rendered = true;
        const parent = this.parentElement! || this.ownerDocument.body;
        const nextElm = this.nextElementSibling!;

        this.classList.add('k-hidden');
        this.setAttribute('aria-hidden', 'true');

        this.wrapper = html.node`<span role="combobox" tabindex="0" aria=${{ expanded: false, controls: 'list-id' }}>
            <span class="k-input-inner">
                ${this._inputValue}
            </span>
            ${this._button}
            ${this}
        </span>`
        
        if(parent && nextElm) {
            parent.insertBefore(this.wrapper, nextElm);
        } else if (parent) {
            parent.appendChild(this.wrapper);        
        }

        this.wrapper.classList.add(
            'k-picker','k-dropdownlist',
            this.getPrefixed(Size[this.size]), 
            this.getPrefixed(Rounded[this.rounded], { prefix: this.roundedPrefix }), 
            this.getPrefixed(FillMode[this.fillMode]), 
            this.getPrefixed(ThemeColor[this.themeColor], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` })
        );

        this._ariaLabel();

        this._popup.anchor = this.wrapper!;
        this.wrapper!.addEventListener('click', () => {
            this._popup.toggle();
        });
    }

    disconnectedCallback() {
        if(this.wrapper){
            const parent = this.wrapper.parentElement! || this.wrapper.ownerDocument.body;
            const nextElm = this.wrapper.nextElementSibling!;

            parent.insertBefore(this, nextElm);
            this.wrapper.remove();
            delete this.wrapper;
            delete this._rendered;
        }
    }

    signal(prop: string, newValue: string, oldValue: string) {
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
                debugger
                if (this._validateText(newValue)) {
                    this._inputValue.textContent = newValue;
                }
                break;
            case StyleOption.Size:
            case StyleOption.Rounded:
            case StyleOption.FillMode:
            case StyleOption.ThemeColor:
                this.updateStyleOptions(prop as StyleOption, newValue, oldValue);
                break;
            default:
                break;
        }
    }

    private _ariaLabel() {
        var inputElm = this,
            inputId = inputElm.getAttribute('id'),
            labelElm = document.querySelector(`label[for="${inputId}"]`),
            ariaLabel = inputElm.getAttribute('aria-label'),
            ariaLabelledBy = inputElm.getAttribute('aria-labelledby'),
            target = this.wrapper,
            labelId;

        if (ariaLabel) {
            target?.setAttribute('aria-label', ariaLabel);
        } else if (ariaLabelledBy) {
            target?.setAttribute('aria-labelledby', ariaLabelledBy);
        } else if (labelElm) {
            labelId = labelElm.getAttribute('id') || this._generateLabelId(labelElm, inputId || 'kendo-ddl');
            target?.setAttribute('aria-labelledby', labelId);
        }
    }
    
    private _createButton() {
        const button = new KendoButton();

        button.icon = 'arrow-s';
        button.size = this.size;
        button.themeColor = this.themeColor,
        button.rounded = this.rounded;
        button.fillMode = this.fillMode;
        button.classList.add('k-input-button');
        button.setAttribute('aria-hidden', 'true');

        this._button = button;
    }

    private _createInput() {
        const value = this._validateValue(this.value) ? this.value : undefined;
        const text = this._validateText(this.text) ? this.text : undefined;

        if (value !== this.value) {
            this.value = value;
        }

        if (text !== this.text) {
            this.text = text;
        }

        this._inputValue = html.node`<span class="k-input-value-text">${text || this._optionLabel}</span>`;
    }

    private _createList() {
        this._list = new KendoList();
        this._list.dataValueField = this.dataValueField;
        this._list.dataTextField = this.dataTextField;
        this._list.dataSource = this._dataSource;

        this._list.addEventListener('change', (args: any) => {
            this.value = args.detail.value;
            this.text = args.detail.text;
        });

        this._list.addEventListener('dataBound', () => {
            this.value = this.value;
            debugger
            this.text = this._list.selectedItem?.text;
        });
    }

    private _createPopup() {
        this._popup = new KendoPopup();
        this.ownerDocument.body.appendChild(this._popup);
        this._popup.querySelector('.k-popup')?.appendChild(this._list);
    }

    private _generateLabelId(label: Element, inputId: string) {
        var labelId = inputId + '-label-id';

        label.setAttribute('id', labelId);

        return labelId;
    }

    private _validateValue(value: any) {
        console.log(value)
        const items = this._list.items;

        return items.some(i => i.value === value)
    }

    private _validateText(value: any) {
        console.log(value)
        const items = this._list.items;

        return items.some(i => i.text === value)
    }
}
