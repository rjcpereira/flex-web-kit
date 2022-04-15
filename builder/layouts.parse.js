const { folders, routify, prepare } = require('./utils');

module.exports = ({ next, layouts }) => {

    folders('layouts', (item, path, file) => {
        const key = routify('layouts', item, path);
        if(key) layouts[key] = {
            key,
            path,
            view: prepare(file)
        };
    }, true);

    next();

    /* shell(`handlebars layouts/base.hbs -f ./dist/web/scripts/templates.js`, next); */

};