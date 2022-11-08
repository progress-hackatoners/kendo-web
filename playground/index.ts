import '@progress/kendo-theme-default';
import { KendoButton } from '../src/index';

window.KendoButton = KendoButton;

let kendoBtn = new KendoButton();
kendoBtn.setAttribute('text', 'Ivan');



const app = document.querySelector('#app')!;

app.appendChild(kendoBtn);


/* >== TEST OBSERVABLE DECORATORS */

function makeObservable() {
    return function(t:any) {
        t.props.forEach((prop) => {
            let desc = Object.getOwnPropertyDescriptor(t.prototype, prop)!;
            
            Object.defineProperty(t.prototype, prop, {
                configurable: true,
                enumerable: false,
                get: desc.get,
                set: function(_: any){
                    if(this.signal) {
                        this.signal(prop, _, this[prop]);
                    }
                    desc.set?.call(this, _);
                }
            });
        });
    }
}

function attr() {
    return function(t:any, prop: string, desc: PropertyDescriptor){       
        if(!t.constructor.props) {
            t.constructor.props = [prop];
        } else {
            t.constructor.props.push(prop);
        }
    }
}




@makeObservable()
class Test {
    private _text: string;

    @attr()
    set text(_: string) {
        this._text = _;
    }

    get text() {
        return this._text;
    }

    signal() {
        console.log(arguments);
    }
}

let a = new Test();
a.text = "test";
/* <== TEST OBSERVABLE DECORATORS */




