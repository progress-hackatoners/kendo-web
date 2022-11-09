import { html } from 'lighterhtml';

import { component, attr } from './decorators';

@component('kendo-button', { extends: 'button' })
export class KendoButton extends HTMLButtonElement {
    private _text: string = '';
    private _textElm?: HTMLElement;
    private _icon?: string;
    private _iconElm?: HTMLElement;

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

    constructor() {
        super();
    }

    async connectedCallback() {
        this.render();
    }

    render() {
        this.classList.add('k-button', 'k-button-md', 'k-rounded-md', 'k-button-solid', 'k-button-solid-primary');
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
    }
}

