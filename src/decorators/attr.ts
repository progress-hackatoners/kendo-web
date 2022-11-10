export function attr() {
    return function(target: any, name: string) {
        let attr = name.toLowerCase();

        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
            target.constructor.observedProps = [];
            target.constructor.attrToProp = {};
        }
    
        target.constructor.attrToProp[attr] = name;
        target.constructor.observedProps.push(name);
        target.constructor.observedAttributes.push(name.toLowerCase());
    }
}