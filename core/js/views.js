flex.views = new Proxy({}, {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, value) {
        target[prop] = value;
        if(Handlebars) {
            if(!Handlebars.templates) Handlebars.templates = {};
            if(!Handlebars.partials) Handlebars.partials = {};
            Handlebars.templates[prop] = Handlebars.partials[prop] = value;
        }
        return true;
    }
})