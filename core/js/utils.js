const isset = val => val != null && val != undefined;

const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
});

const slugify = (text, dash) => !text ? text : text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\//g, 'DASH').replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/DASH/g, dash || '-');

const each = (arr, next) => {
    if (!arr || !arr.length || !next) return;
    for (let i = 0; i < arr.length; i++) next(arr[i], i, arr.length == (i + 1));
};

const parseWhiteSpaces = str => !str ? null : str.replace(/ {2,}/g, ' ');

const parsePropertyKey = path => !path || typeof path !== 'string' ? path : path.split('.');

const getProperty = (obj, path, fallback) => {
    if (!obj || !path) return obj;
    let current = obj;
    const props = parsePropertyKey(path);
    for (let i = 0; i < props.length; i++) {
        if (!current[props[i]]) return fallback;
        current = current[props[i]];
    }
    return current;
};

const setProperty = (obj, path, value) => {
    if (!obj || !path) return obj;
    const props = parsePropertyKey(path);
    const limit = props.length - 1;
    for (let i = 0; i < limit; ++i) {
        const key = props[i];
        obj = obj[key] ?? (obj[key] = {});
    }
    const key = props[limit];
    obj[key] = value;
};

const proxy = (data, next) => {
    const res = new Proxy(data, {
        get(target, key) {
            return target[key];
        },
        set(target, prop, value) {
            target[prop] = reactive(value, next);
            next && next(target, prop, target[prop]);
            return true;
        }
    });
    return res;
};

const reactive = (data, next) => {
    if (!data || typeof data !== 'object' || data.constructor.name.startsWith('HTML')) return data;
    for (const key in data) data[key] = reactive(data[key], next);
    return proxy(data, next);
};

flex.utils = {
    isset,
    uuid,
    slugify,
    each,
    parseWhiteSpaces,
    parsePropertyKey,
    getProperty,
    setProperty,
    proxy,
    reactive
};