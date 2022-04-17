const { folders, routify, prepare } = require('./utils');

module.exports = ({ next, views }) => {

    folders('views', (name, path, file) => {
        const key = routify('views', name, path);
        if(key) views[key] = {
            key,
            path,
            name,
            view: prepare(file)
        };
    }, true);

    next();
};