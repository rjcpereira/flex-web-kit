const push = route => {
    console.log(route)
    if(!route) return;
    const path = `${window.location.origin}${route}`;
    window.history.pushState({
        path
    }, '', path);
};

const parse = url => !url ? url : `${url}`.replace(flex.config.base, '').replace('index.html', '');

const prepare = () => {
    if(!window.history?.pushState) return;
    const selector = 'href';
    const elements = flex.dom.getAll(`a[${selector}]`);
    console.log(elements)
    flex.utils.each(elements, element => {
        if(!element.parsed) {
            element.parsed = true;
            flex.events.click(element, event => {
                const key = element.getAttribute(selector);
                if(key.startsWith(flex.config.base) || (key.startsWith('/') && key.charAt(1) != '/')) {
                    event?.preventDefault();
                    console.log(key, parse(key))
                    push(parse(key));
                }
            }, true);
        }
    });
};

flex.router = {
    push,
    parse,
    prepare
};