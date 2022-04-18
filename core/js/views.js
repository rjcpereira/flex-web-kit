flex.views = new Proxy({
    ...(Handlebars.templates || {}),
    ...(Handlebars.partials || {})
}, {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, value) {
        if (Handlebars) {
            if (!Handlebars.templates) Handlebars.templates = {};
            if (!Handlebars.partials) Handlebars.partials = {};
            Handlebars.templates[prop] = Handlebars.partials[prop] = value;
        }
        target[prop] = value;
        return true;
    }
});

const worker = (tag, ref, html) => !document.head.querySelector(`${tag}[data-flex="${ref}"]`) && flex.dom.createElement(tag, {
    html,
    'data-flex': ref
}, document.head);

flex.styles = new Proxy({}, {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, value) {
        target[prop] = value;
        worker('style', prop, value);
        return true;
    }
});

flex.scripts = new Proxy({}, {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, value) {
        target[prop] = value;
        worker('script', prop, value);
        return true;
    }
});