export function attr() {
    return function(target: any, name: string) {
        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
        }
    
        target.constructor.observedAttributes.push(name);
    }
}