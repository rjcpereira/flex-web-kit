const morph = (element, html) => {
    if (!element || element.innerHTML == html) return;

    if (!html) element.innerHTML = '';
    else {

        const latest = document.createElement('div');
        latest.innerHTML = html;
        console.log(element.children.length,latest.children.length)
        let total = latest.children.length > element.children.length ? latest.children.length : element.children.length;
        for (let i = 0; i < total; i++) {
            if (!latest.children[i]) element.removeChild(element.children[i]);
            else if (!element.children[i]) element.appendChild(latest.children[i]);
            else if (element.children[i].tagName != latest.children[i].tagName) element.replaceChild(latest.children[i], element.children[i]);
            else {
                console.log(element.children[i],latest.children[i])
                
                if (element.children[i].innerHTML != latest.children[i].innerHTML || element.children[i].textContent != latest.children[i].textContent) {
                if (!latest.children[i].children || !latest.children[i].children.length) {
                    if (!element.innerHTML != latest.children[i].innerHTML) element.innerHTML = latest.innerHTML;
                }
                else morph(element.children[i], latest.children[i].innerHTML);
            }
        }
        }
    }
}



const compile = (template, element) => {
    toDo('alterar só caso existam alterações nos dados');
    toDo('preservar inputs e select?');
    if(!template) return;
    const render = Handlebars.templates[template];
    if(!render) return;
    if(!element) element = FlexJS.utils.getElementID(template);
    console.warn(template, element)
    if(!element) return;
    const html = render(FlexJS.content);
    console.log(element.innerHTML)
    console.log(html)
    morph(element.parentElement, html);
    FlexJS.hooks.emit('render');
};

const meta = () => {
    const title = FlexJS.utils.getElement('title');
    if(title) title.innerHTML = FlexJS.content.title;
}

const update = data => {
    FlexJS.log('Received socket data', data);
    if(!Handlebars || !Handlebars.templates || !data) return;
    FlexJS.content = {
        ...(FlexJS.content || {}),
        ...(data || {})
    };
    console.log(FlexJS.content)
    meta();
    FlexJS.utils.each(FlexJS.utils.getElements('[id]:not(script):not(link)'), element => compile(element.getAttribute('id').replace('#', ''), element));
};

const init = () => {
    console.log('ssdfsdfsdf',Handlebars.templates)
    if(!Handlebars || !Handlebars.templates) return;
    let templates = {
        ...(Handlebars.templates || {}),
        ...(Handlebars.partials || {})
    }
    Handlebars.templates = Handlebars.partials = templates;
    if(FlexJS.helpers && (!Handlebars.helpers || !Object.keys(Handlebars.helpers).length || !Handlebars.helpers.FlexJS)) for(let key in FlexJS.helpers) Handlebars.registerHelper(key, FlexJS.helpers[key]);
    FlexJS.lazyload(`${FlexJS.config.base}/scripts/${FlexJS.config.scripts.socket}.js`, attrs, () => {
        FlexJS.log('SocketIO ready');
        const socket = io(FlexJS.config.base);
        socket.on("data", res => update(res));
    });
};

FlexJS.render = {
    update,
    compile
};

const suffix = `?v=${FlexJS.config.updated}`, attrs = {
    async: true
};

FlexJS.hooks.on('ready', () => {
    const content = FlexJS.utils.getElement('[data-content]');
    content?.remove();
    FlexJS.log('Fetching renderer & templates');
    FlexJS.lazyload(`${FlexJS.config.base}/scripts/helpers.js`, attrs, suffix, () => FlexJS.log('Helpers loaded'));
    FlexJS.lazyload(`${FlexJS.config.base}/scripts/${FlexJS.config.scripts.render}`, attrs, () => {
        FlexJS.log('Render loaded');
        FlexJS.lazyload(`${FlexJS.config.base}/scripts/templates.js`, attrs, suffix, () => {
            FlexJS.log('Templates loaded');
            init();
        });
    });
});