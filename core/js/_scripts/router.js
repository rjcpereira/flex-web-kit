const push = route => {
    console.log(route)
    if(!route) return;
    const path = `${window.location.origin}${route}`;
    window.history.pushState({
        path
    }, '', path);
    FlexJS.net.get(`/api${route}`, res => FlexJS.render.update(res));
    FlexJS.hooks.emit('navigation');
};

const parse = url => !url ? url : `${url}`.replace(FlexJS.config.base, '').replace('index.html', '');

const prepare = () => {
    if(!window.history?.pushState) return;
    const selector = 'href';
    const elements = FlexJS.utils.getElements(`a[${selector}]`);
    console.log(elements)
    FlexJS.utils.each(elements, element => {
        if(!element.parsed) {
            element.parsed = true;
            FlexJS.events.click(element, event => {
                const key = element.getAttribute(selector);
                if(key.startsWith(FlexJS.config.base) || (key.startsWith('/') && key.charAt(1) != '/')) {
                    event?.preventDefault();
                    console.log(key, parse(key))
                    push(parse(key));
                }
            }, true);
        }
    });
};

if(window.history?.pushState) {
    FlexJS.hooks.on('ready', prepare);
    FlexJS.hooks.on('navigation', prepare);
    FlexJS.hooks.on('render', prepare);
}

FlexJS.router = {
    push,
    parse,
    prepare
};