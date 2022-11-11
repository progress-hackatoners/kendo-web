import { html } from 'lighterhtml';
import { component, attr } from './decorators';

@component('kendo-list', { extends: 'ul' })
export class KendoList extends HTMLUListElement {
    private _dataSource: any;
    private _rendered?: boolean;
    
    public list?: HTMLElement;

    @attr()
    set dataSource (val: any) {
        this._dataSource = val;
    }

    get dataSource() {
        return this._dataSource;
    }

    constructor() {
        super();
    }

    async connectedCallback() {
        if(!this._rendered) {
            this.render();
        }
    }

    adoptedCallback() {
    }

    disconnectedCallback() {
        if(this.list){
            const parent = this.list.parentElement! || this.list.ownerDocument.body;
            const nextElm = this.list.nextElementSibling!;

            parent.insertBefore(this, nextElm);
            this.list.remove();
            delete this.list;
            delete this._rendered;
        }
    }

    render() {
        this._rendered = true;
        const parent = this.parentElement! || this.ownerDocument.body;
        const nextElm = this.nextElementSibling!;
        this.classList.add('k-list-ul');

        this.list = html.node`<div class='k-list k-list-md'>
            <div class='k-list-content k-list-scroller'>
                ${this}
                This is the list!
            </div>
        </div>`;
        
        if(parent && nextElm) {
            parent.insertBefore(this.list, nextElm);
        } else if (parent) {
            parent.appendChild(this.list);        
        }
    }

    signal(prop: string, newValue: string, oldValue: string) {
        switch (prop) {
            case 'dataSource':
                
                break;
            default:
                break;
        }
    }   
}
