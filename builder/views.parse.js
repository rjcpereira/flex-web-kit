const { folders, routify, prepare } = require('./utils');

module.exports = ({ next, views }) => {

    folders('views', (item, path, file) => {
        const key = routify('views', item, path);
        if(key) views[key] = {
            key,
            path,
            name: item,
            view: prepare(file)
        };
    }, true);

    next();

    /* shell(`handlebars layouts/base.hbs -f ./dist/web/scripts/templates.js`, next); */

};