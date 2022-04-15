const lazyload = (src, arg1, arg2, arg3, arg4) => {
    let container = document.head, args = {}, next, suffix = '';
    if(arg4) {
        if(typeof arg4 == 'function') next = arg4;
        else if(typeof arg4 == 'string') suffix = arg4;
    }
    if(arg3) {
        if(typeof arg3 == 'function') next = arg3;
        else if(typeof arg3 == 'string') suffix = arg3;
    }
    if(arg2) {
        if(typeof arg2 == 'function') next = arg2;
        else if(typeof arg2 == 'object') args = {
            ...args,
            ...arg2
        };
        else if(typeof arg2 == 'string') suffix = arg2;
    }
    if(arg1) {
        if(typeof arg1 == 'function') next = arg1;
        else if(typeof arg1 == 'object') args = {
            ...args,
            ...arg1
        };
        else if(typeof arg1 == 'string') container = getElement(arg1);
        else container = arg1;
    }
    const ext = src.split('.').pop().toLowerCase();
    const tag = ext != 'js' ? (!['jpg', 'jpeg', 'png', 'webp', 'gif', 'ico'].includes(ext) ? ['link', {
        href: `${src}${suffix}`,
        type: 'text/css',
        rel: 'stylesheet',
        media: 'screen,print'
    }] : ['img', {
        src: `${src}${suffix}`,
        loading: 'lazy'
    }]) : ['script', {
        type: 'text/javascript',
        src: `${src}${suffix}`
    }];
    const element = document.createElement(tag[0]);
    if(next) element.onload = next;
    const attrs = {
        ...(tag[1] || {}),
        ...(args || {})
    }
    for(let key in attrs) element.setAttribute(key, attrs[key]);
    container.appendChild(element);
};

FlexJS.lazyload = lazyload;