import { html } from 'lighterhtml';
import { component, attr } from './decorators';

@component('kendo-popup', { extends: 'div' })
export class KendoPopup extends HTMLDivElement {
    private _anchor: string | HTMLElement = '';
    private _anchorElm?:  HTMLElement | undefined;
    private _rendered?: boolean;

    wrapper?: HTMLElement;

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
        if(!this._rendered) {
            this.render();
        }
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

    render() {
        const parent = this.parentElement! || this.ownerDocument.body;
        const nextElm = this.nextElementSibling!;
        this._rendered = true;
        this.hidden = true;
        this.classList.add('k-popup', 'k-group', 'k-reset', 'k-state-border-up');
        this.wrapper = html.node`<div class='k-animation-container'>${this}</div>`;

        this.wrapper.hidden = true;
        this.hidden = false;
        
        if(parent && nextElm) {
            parent.insertBefore(this.wrapper, nextElm);
        } else if (parent) {
            parent.appendChild(this.wrapper);        
        }
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
        this.wrapper!.hidden = true;
    }

    public show() {
        this.wrapper!.hidden = false;
        this.position();
    }

    public toggle() {
        this[this.wrapper!.hidden ? 'show' : 'hide']();
    }

    private position() {
        if(!this.wrapper) {
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
}