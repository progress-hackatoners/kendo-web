export function component(name: string, options: ElementDefinitionOptions = {}) {
    return function (target: any) {
        target.prototype.attributeChangedCallback = function () {
            const prop = this.constructor.attrToProp[arguments[0]] ;
            const newValue = arguments[2];
            
            if(this[prop] !== newValue) {
                this[prop] = newValue;
            }
        }

        target.observedProps.forEach((prop: string) => {
            let desc = Object.getOwnPropertyDescriptor(target.prototype, prop)!;

            if(desc) {
                Object.defineProperty(target.prototype, prop, {
                    configurable: true,
                    enumerable: false,
                    get: desc.get,
                    set: function(_: any){
                        const oldValue = this[prop];
                        desc.set?.call(this, _);
                        if(this.signal) {
                            this.signal(prop, _, oldValue);
                        }
                    }
                });

            } else {
                console.error("Kendo Component Decorator: Attach the component decorator to get or set field only")
            } 
        });
        
        window.customElements.define(name, target, options);
    };
}