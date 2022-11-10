import { html } from 'lighterhtml';
import { component, attr } from './decorators';

@component('kendo-popup', { extends: 'div' })
export class KendoPopup extends HTMLDivElement {
    private _anchor: string | HTMLElement = '';
    private _anchorElm?:  HTMLElement | undefined;

    @attr()
    public set anchor(value: string | HTMLElement) {
        if(typeof value === 'string') {
            this._anchorElm = document.querySelector(value as string) as HTMLElement;
        }

        if(value instanceof HTMLElement) {
            this._anchorElm = value;
        }
        this._anchor = value;
    };
    
    get anchor() {
        return this._anchor;
    }

    constructor() {
        super();
    }

    async connectedCallback() {
        this.render();
    }

    render() {
        this.hidden = true;
        this.classList.add('k-animation-container');
        const childNodes = this.childNodes;
        const popupPart = html.node`<div class='k-popup k-group k-reset k-state-border-up'>${childNodes}</div>`;

        this.appendChild(popupPart)

    }

    signal(prop: string, newValue: string, oldValue: string) {
        switch (prop) {
            case 'anchor':
                this.position();
                break;
            default:
                break;
        }
    }   

    public hide() {
        this.hidden = true;
    }

    public show() {
        this.hidden = false;
        this.position();
    }

    public toggle() {
        this[this.hidden ? 'show' : 'hide']();
    }

    private position() {
        let top = 0;
        let left = 0;
        let width = this.offsetWidth;
        
        if (this._anchorElm) {
            top = this._anchorElm.offsetTop + this._anchorElm.offsetHeight;
            left = this._anchorElm.offsetLeft;
            width = this._anchorElm.offsetWidth;
        } 

        this.style.top = top + 'px';
        this.style.left = left + 'px';
        this.style.width = width + 'px';
    }
}