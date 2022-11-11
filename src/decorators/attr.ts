export function attr(isAttrubute: boolean = true) {
    return function(target: any, name: string) {
        let attr = name.toLowerCase();

        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
            target.constructor.observedProps = [];
            target.constructor.attrToProp = {};
        }
    
        target.constructor.attrToProp[attr] = name;
        target.constructor.observedProps.push(name);

        if (isAttrubute) {
            target.constructor.observedAttributes.push(name.toLowerCase());
        }
    }
}