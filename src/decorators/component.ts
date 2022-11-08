export function component(name: string, options: ElementDefinitionOptions = {}) {
    return function (target: any) {
        target.prototype.attributeChangedCallback = function () {
            const attr = arguments[0];
            const newValue = arguments[2];

            this[attr] = newValue;
        }
        
        target.prototype.subscribe = function(prop: string, subscription: Function){
            if(!this.subscriptions) {
                this.subscriptions = {};
            }

            if(!this.subscriptions[prop]) {
                this.subscriptions[prop] = [subscription];
                return;
            }

            this.subscriptions[prop].push(subscription);
        };

        target.prototype.notify = function () {
            const args = arguments;
            const attr = args[0];

            if(this.subscriptions && this.subscriptions[attr]){
                this.subscriptions[attr].forEach((subscription: Function) => {
                    subscription.call(this, ...args);
                });
            }
        }

        window.customElements.define(name, target, options);
    };
}