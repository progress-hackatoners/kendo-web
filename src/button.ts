import { html } from 'lighterhtml';

import { component, attr} from './decorators';

@component('kendo-button', { extends: 'button' })
export class KendoButton extends HTMLButtonElement {
    private _text: string = '';
    private _textElm?: HTMLElement;
    private _icon?: string;
    private _iconElm?: HTMLElement;

    @attr()
    public set text(value) {
        this._text = value;
        (this as any).notify('text', value);
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
        (this as any).notify('icon', value);
    };

    get icon() {
        return this._icon?.replace('k-i-', '');
    }

    get iconElm() {
        return this._iconElm;
    }

    private set iconElm(value) {
        this._iconElm = value;
    }

    constructor() {
        super();

        (this as any).subscribe("text", () => {
            if (this.textElm) {
                this.textElm.innerText = this._text;
            } else {
                this.renderText();
            }
        });

        (this as any).subscribe("icon", ({}, value: string) => {
            let oldIcon = this._icon!;
            this._icon = `k-i-${value}`;

            if (this.iconElm) {
                this.iconElm.classList.replace(oldIcon, this._icon);
            } else {
                this.renderIcon();
            }
        });
    }

    async connectedCallback() {
        this.render();
    }

    render() {
        this.classList.add('k-button', 'k-button-md', 'k-rounded-md', 'k-button-solid', 'k-button-solid-primary');
    }

    private renderText() {
        this.textElm = html.node`<span class='k-button-text'>${this.text}</span>`;
        this.appendChild(this.textElm);
    }

    private renderIcon() {
        this.iconElm = html.node`<span class='k-icon k-button-icon ${this._icon}'></span>`;
        this.insertBefore(this.iconElm, this.textElm!);
    }
}

