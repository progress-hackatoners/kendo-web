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
    private _optionLabel?: string;
    private _size: SizeKey = "medium" as SizeKey;
    private _rounded: RoundedKey = "medium" as RoundedKey;
    private _fillMode: FillModeKey = "solid" as FillModeKey;
    private _themeColor: ThemeColorKey = "base" as ThemeColorKey;

    private _list: KendoList;
    private _button: KendoButton;


    public wrapper?: HTMLElement;

    @attr()
    set dataSource (val: any) {
        this._dataSource = val;
    }

    get dataSource() {
        return this._dataSource;
    }

    @attr()
    set value (val: string) {
        this._value = val;
    }

    get value() {
        return this._value!;
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
                <span class="k-input-value-text">${this._optionLabel}</span>
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
            case 'value':
                (this.querySelector('.k-input-inner') as HTMLElement).textContent = newValue;
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

    private _generateLabelId(label: Element, inputId: string) {
        var labelId = inputId + '-label-id';

        label.setAttribute('id', labelId);

        return labelId;
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

    private _createList() {
        this._list = new KendoList();
        this._list.dataSource = this._dataSource;
    }
}
