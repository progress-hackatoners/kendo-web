import { html } from 'lighterhtml';

import { component, attr } from './decorators';

export enum Size {
    small = 'sm', 
    medium = 'md', 
    large = 'lg',
    none = ''
}
type SizeKey = keyof typeof Size;

export enum Rounded {
    small = 'sm', 
    medium = 'md', 
    large = 'lg',
    none = ''
}
type RoundedKey = keyof typeof Rounded;

export enum FillMode {
    solid = 'solid', 
    outline = 'outline', 
    link = 'link',
    none = ''
}
type FillModeKey = keyof typeof FillMode;

export enum ThemeColor {
    base = 'base', 
    primary = 'primary', 
    secondary = 'secondary',
    tertiary = 'tertiary',
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error',
    dark = 'dark',
    light = 'light',
    inverse = 'inverse',
    none = ''
}
type ThemeColorKey = keyof typeof ThemeColor;

export enum StyleOption {
    Size = 'size',
    Rounded = 'rounded',
    FillMode = 'fillMode',
    ThemeColor = 'themeColor'
}

const buttonClass = 'k-button'
const buttonPrefix = `${buttonClass}-`;
const roundedPrefix = 'k-rounded-';

const getPrefixed = (val: string, options: { prefix?: string } = {}) => val ? `${options.prefix || buttonPrefix}${val}` : '';

@component('kendo-button', { extends: 'button' })
export class KendoButton extends HTMLButtonElement {
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
            getPrefixed(Size[this.size]), 
            getPrefixed(Rounded[this.rounded], { prefix: roundedPrefix }), 
            getPrefixed(FillMode[this.fillMode]), 
            getPrefixed(ThemeColor[this.themeColor], { prefix: `${getPrefixed(FillMode[this.fillMode])}-` })
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

    private updateStyleOptions(op: StyleOption, val: string, old: string) {
        let themeColorOld: string;
        let themeColorNew: string;

        switch (op) {
            case StyleOption.Size:
                old = getPrefixed(Size[old as SizeKey]);
                val = getPrefixed(Size[val as SizeKey]);
                break;
            case StyleOption.Rounded:
                old = getPrefixed(Rounded[old as RoundedKey], { prefix: roundedPrefix });
                val = getPrefixed(Rounded[val as RoundedKey], { prefix: roundedPrefix });
            case StyleOption.FillMode:
                old = getPrefixed(FillMode[old as FillModeKey]);
                val = getPrefixed(FillMode[val as FillModeKey]);
                themeColorOld = getPrefixed(ThemeColor[this.themeColor as ThemeColorKey], { prefix: `${old}-` });
                themeColorNew = getPrefixed(ThemeColor[this.themeColor as ThemeColorKey], { prefix: `${val}-` });
                break;
            case StyleOption.ThemeColor:
                old = getPrefixed(ThemeColor[old as ThemeColorKey], { prefix: `${getPrefixed(FillMode[this.fillMode])}-` });
                val = getPrefixed(ThemeColor[val as ThemeColorKey], { prefix: `${getPrefixed(FillMode[this.fillMode])}-` });
                break;
        }

        if (old) {
            this.classList.remove(old);
        }

        if (val) {
            this.classList.add(val);
        }
       
        if (themeColorOld!) {
            this.classList.remove(themeColorOld);
        } 

        if (themeColorNew!) {
            this.classList.add(themeColorNew);
        } 
    }   

    private renderText() {
        this.textElm = html.node`<span class='k-button-text'>${this.text}</span>`;
        this.appendChild(this.textElm);
    }

    private renderIcon() {
        this.iconElm = html.node`<span class='k-icon k-button-icon k-i-${this.icon}'></span>`;
        this.insertBefore(this.iconElm, this.textElm!);
    }
}

