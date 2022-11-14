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
let KendoPopup = class KendoPopup extends HTMLDivElement {
    _anchor = '';
    _anchorElm;
    _rendered;
    wrapper;
    set anchor(value) {
        if (typeof value === 'string') {
            this._anchorElm = document.querySelector(value);
        }
        if (value instanceof HTMLElement) {
            this._anchorElm = value;
        }
        this._anchor = value;
    }
    ;
    get anchor() {
        return this._anchor;
    }
    constructor() {
        super();
    }
    async connectedCallback() {
        if (!this._rendered) {
            this.render();
        }
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
    render() {
        const parent = this.parentElement || this.ownerDocument.body;
        const nextElm = this.nextElementSibling;
        this._rendered = true;
        this.hidden = true;
        this.classList.add('k-popup', 'k-list-container');
        this.wrapper = html.node `<div class='k-animation-container'>${this}</div>`;
        this.wrapper.hidden = true;
        this.hidden = false;
        if (parent && nextElm) {
            parent.insertBefore(this.wrapper, nextElm);
        }
        else if (parent) {
            parent.appendChild(this.wrapper);
        }
    }
    signal(prop, newValue, oldValue) {
        switch (prop) {
            case 'anchor':
                this.position();
                break;
            default:
                break;
        }
    }
    hide() {
        this.wrapper.hidden = true;
    }
    show() {
        this.wrapper.hidden = false;
        this.position();
    }
    toggle() {
        this[this.wrapper.hidden ? 'show' : 'hide']();
    }
    position() {
        if (!this.wrapper) {
            return;
        }
        let top = 0;
        let left = 0;
        let width = this.wrapper.offsetWidth;
        if (this._anchorElm) {
            top = this._anchorElm.offsetTop + this._anchorElm.offsetHeight;
            left = this._anchorElm.offsetLeft;
            width = this._anchorElm.offsetWidth;
        }
        this.wrapper.style.top = top + 'px';
        this.wrapper.style.left = left + 'px';
        this.wrapper.style.width = width + 'px';
    }
};
__decorate([
    attr(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], KendoPopup.prototype, "anchor", null);
KendoPopup = __decorate([
    component('kendo-popup', { extends: 'div' }),
    __metadata("design:paramtypes", [])
], KendoPopup);
export { KendoPopup };
