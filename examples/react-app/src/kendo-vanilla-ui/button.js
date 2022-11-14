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
import { Size } from './enums/size';
import { Rounded } from './enums/rounded';
import { FillMode } from './enums/fillmode';
import { ThemeColor } from './enums/themecolor';
import { StyleOption } from './enums/styleoption';
const buttonClass = 'k-button';
let KendoButton = class KendoButton extends HTMLButtonElement {
    wrapperPrefix = `k-button-`;
    roundedPrefix = 'k-rounded-';
    _text = '';
    _textElm;
    _icon;
    _iconElm;
    _size = "medium";
    _rounded = "medium";
    _fillMode = "solid";
    _themeColor = "base";
    set text(value) {
        this._text = value;
    }
    ;
    get text() {
        return this._text;
    }
    get textElm() {
        return this._textElm;
    }
    set textElm(value) {
        this._textElm = value;
    }
    set icon(value) {
        this._icon = value;
    }
    ;
    get icon() {
        return this._icon;
    }
    get iconElm() {
        return this._iconElm;
    }
    set iconElm(value) {
        this._iconElm = value;
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
    }
    async connectedCallback() {
        this.render();
    }
    render() {
        this.classList.add(buttonClass, this.getPrefixed(Size[this.size]), this.getPrefixed(Rounded[this.rounded], { prefix: this.roundedPrefix }), this.getPrefixed(FillMode[this.fillMode]), this.getPrefixed(ThemeColor[this.themeColor], { prefix: `${this.getPrefixed(FillMode[this.fillMode])}-` }));
    }
    signal(prop, newValue, oldValue) {
        switch (prop) {
            case 'text':
                if (this.textElm) {
                    this.textElm.innerText = newValue;
                }
                else {
                    this.renderText();
                }
                break;
            case 'icon':
                if (this.iconElm) {
                    this.iconElm.classList.replace(`k-i-${oldValue}`, `k-i-${newValue}`);
                }
                else {
                    this.renderIcon();
                }
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
    renderText() {
        this.textElm = html.node `<span class='k-button-text'>${this.text}</span>`;
        this.appendChild(this.textElm);
    }
    renderIcon() {
        this.iconElm = html.node `<span class='k-icon k-button-icon k-i-${this.icon}'></span>`;
        this.insertBefore(this.iconElm, this.textElm);
        this.iconElm.addEventListener('click', () => {
            const ev = new CustomEvent('iconClick', { detail: { icon: this.icon } });
            this.dispatchEvent(ev);
        });
    }
};
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoButton.prototype, "text", null);
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoButton.prototype, "icon", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoButton.prototype, "size", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoButton.prototype, "rounded", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoButton.prototype, "fillMode", null);
__decorate([
    attr(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], KendoButton.prototype, "themeColor", null);
KendoButton = __decorate([
    component('kendo-button', { extends: 'button' }),
    sizingoptions(),
    __metadata("design:paramtypes", [])
], KendoButton);
export { KendoButton };
//Experimental
let KendoWebButton = class KendoWebButton extends HTMLElement {
    _text;
    _btn;
    get text() {
        return this._text;
    }
    set text(_) {
        this._text = _;
    }
    constructor() {
        super();
    }
    async connectedCallback() {
        this._btn = new KendoButton();
        this.appendChild(this._btn);
    }
    signal(prop, newValue, oldValue) {
        switch (prop) {
            case 'text':
                let that = this;
                setTimeout (() => {
                that._btn.text = that.text;
                });
                break;
        }
    }
};
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoWebButton.prototype, "text", null);
KendoWebButton = __decorate([
    component('kendo-web-button'),
    __metadata("design:paramtypes", [])
], KendoWebButton);
export { KendoWebButton };
