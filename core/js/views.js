flex.views = new Proxy({
    ...(Handlebars.templates || {}),
    ...(Handlebars.partials || {})
}, {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, value) {
        console.log(prop, value, Handlebars, Handlebars.templates, Handlebars.partials)
        if (Handlebars) {
            if (!Handlebars.templates) Handlebars.templates = {};
            if (!Handlebars.partials) Handlebars.partials = {};
            Handlebars.templates[prop] = Handlebars.partials[prop] = value;
        }
        target[prop] = value;
        console.warn(prop, value, Handlebars, Handlebars.templates, Handlebars.partials)
        return true;
    }
});