const { folders, routify, prepare } = require('./utils');

module.exports = ({ next, layouts }) => {

    folders('layouts', (name, path, file) => {
        const key = routify('layouts', name, path);
        if(key) layouts[key] = {
            key,
            path,
            name,
            view: prepare(file)
        };
    }, true);

    next();
};