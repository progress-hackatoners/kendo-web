import { html } from 'lighterhtml';

import { component, attr, sizingoptions } from './decorators';

import { Size } from './enums/size';
import { Rounded } from './enums/rounded';
import { FillMode } from './enums/fillmode';
import { ThemeColor } from './enums/themecolor';
import { StyleOption } from './enums/styleoption';

import type { SizeKey } from './enums/size';
import type { RoundedKey } from './enums/rounded';
import type { FillModeKey } from './enums/fillmode';
import type { ThemeColorKey } from './enums/themecolor';


const buttonClass = 'k-button'

@component('kendo-button', { extends: 'button' })
@sizingoptions()
export class KendoButton extends HTMLButtonElement {
    private wrapperPrefix = `k-button-`;
    private roundedPrefix = 'k-rounded-';

    private _text: string = '';
    private _textElm?: HTMLElement;
    private _icon?: string;
    private _iconElm?: HTMLElement;
    private _size: SizeKey = "medium" as SizeKey;
    private _rounded: RoundedKey = "medium" as RoundedKey;
    private _fillMode: FillModeKey = "solid" as FillModeKey;
    private _themeColor: ThemeColorKey = "base" as ThemeColorKey;

    @attr()
    public set text(value) {
        this._text = value;
    };
    
    get text() {
        return this._text;
    }

    get textElm() {
        return this._textElm;
    }
    private set textElm(value) {
        this._textElm = value;
    }

    @attr()
    set icon(value) {
        this._icon = value;
    };
    get icon() {
        return this._icon;
    }

    get iconElm() {
        return this._iconElm;
    }
    private set iconElm(value) {
        this._iconElm = value;
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
    }

    async connectedCallback() {
        this.render();
    }

    render() {
        this.classList.add(
            buttonClass, 
            this.getPrefixed(Size[this.size]), 
            this.getPrefixed(Rounded[this.rounded], { prefix: this.roundedPrefix }), 
            this.getPrefixed(FillMode[this.fillMode]), 
            this.getPrefixed(ThemeColor[this.themeColor], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` })
        );
    }

    signal(prop: string, newValue: string, oldValue: string) {
        switch (prop) {
            case 'text':
                if (this.textElm) {
                    this.textElm.innerText = newValue;
                } else {
                    this.renderText();
                }
                break;
            case 'icon':
                if (this.iconElm) {
                    this.iconElm.classList.replace(`k-i-${oldValue}`, `k-i-${newValue}`);
                } else {
                    this.renderIcon();
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

    private renderText() {
        this.textElm = html.node`<span class='k-button-text'>${this.text}</span>`;
        this.appendChild(this.textElm);
    }

    private renderIcon() {
        this.iconElm = html.node`<span class='k-icon k-button-icon k-i-${this.icon}'></span>`;
        this.insertBefore(this.iconElm, this.textElm!);

        this.iconElm.addEventListener('click', () => {
            const ev = new CustomEvent('iconClick', { detail: { icon: this.icon } });
            this.dispatchEvent(ev);
        });
    }
}


//Experimental
@component('kendo-web-button')
export class KendoWebButton extends HTMLElement {
    private _text?: any;
    private _btn?: KendoButton;
    @attr()
    get text() {
        return this._text!;
    }

    set text(_: any) {
        this._text = _;
    }

    constructor(){
        super();

    }

    async connectedCallback() {
        this._btn = new KendoButton();

        this.appendChild(this._btn);
    }

    signal(prop: string, newValue: string, oldValue: string) {
        switch (prop) {
            case 'text':
                this._btn!.text = this.text;
                break;

        }
    }
}

