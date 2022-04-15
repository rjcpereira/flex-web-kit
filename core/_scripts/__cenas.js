/* 
const replaceContent = (component, value) => {
    if (!component) return;
    component.element[!component.tag ? 'textContent' : 'innerHTML'] = value || '';
};

const proxyElement = component => new Proxy(component, {
    get(target, property, receiver) {
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        //console.log({ target, property, value });
        replaceContent(component, value);
        return Reflect.set(target, property, value, receiver);
    }
});

const getAttributes = element => new Proxy(element.getAttributeNames().reduce((acc, name) => ({
    ...acc,
    [name]: element.getAttribute(name)
}), {}), {
    get(target, property, receiver) {
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        //console.log({ target, property, value });
        element.setAttribute(property, value);
        return Reflect.set(target, property, value, receiver);
    },
    deleteProperty(target, property, receiver) {
        element.removeAttribute(property);
        return Reflect.deleteProperty(target, property, receiver);
    },
});

const proxyChildren = (children, parent) => new Proxy(children, {
    set(target, property, value, receiver) {
        const id = !value || !/^\d+$/.test(value);
        id && console.log('set', { target, property, value, receiver });
        let component = value;
        if (id && value) {
            component = proxyComponent(document.createElement(value.tag || 'span'), {
                ...(value || {}),
                fill: true
            });
            parent.appendChild(component.element);
        }
        return Reflect.set(target, property, component, receiver);
    }
});

const proxyComponent = (element, args) => {
    if (!element) return;
    console.log('[component]', element, args)
    let options = {
        ...(args || {})
    };
    let component = {
        element
    };
    switch (element.nodeType) {
        case 3:
            if (!options.fill) component.text = element.textContent;
            else if (args.text) element.textContent = args.text;
            break;
        default:
            console.log(options, args)
            if (options.fill && (args.html || args.text)) element.innerHTML = (args.html || args.text);
            component.tag = element.tagName.toLowerCase();
            component.attrs = {
                ...(getAttributes(element) || {}),
                ...(options.attrs || {})
            };
            console.log(element);
            let children = [];
            if (!options.fill) !(!element.childNodes || !element.childNodes.length) && element.childNodes.forEach(node => children.push(proxyComponent(node)));
            else if (!(!options.children || !options.children.length)) options.children.forEach(item => {
                const child = document.createElement(item.tag || 'span');
                element.appendChild(child);
                children.push(proxyComponent(child, {
                    ...item,
                    fill: true
                }));
            });
            console.log(element.outerHTML)
            component.children = proxyChildren(children, element);
            console.log(element);
            break;
    }
    return proxyElement(component);
};

const res = proxyComponent(document.body)

console.log(res) */