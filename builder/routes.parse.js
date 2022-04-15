const config = require('./config'),
    fs = require('fs');

/* const { log, folders } = require('./utils'); */

module.exports = ({ next, layouts, compile }) => {

    const render = compile(layouts.base.view);

    const main = {
        '@route': {
            path: '',
            params: {}
        },
        '@url': config.base
    };

    const body = render({
        ...main,
        title: 'Title',
        description: 'Description',
        menu: {
            items: [
                { url: '/', title: 'Home' },
                { url: '/about', title: 'About' }
            ]
        },
        highlights: {
            world: [
                { title: 'First World Article', body: '<span style="font-style:italic;">First world article content</span>' }
            ],
            tech: [
                { title: 'Last Tech Article', body: 'Last tect article content' },
                { title: 'First Tech Article', body: 'First tect article content <pre>with the pre element</pre>' }
            ]
        }
    });

    const html = `<!DOCTYPE html><html><head></head><body>${body}</body></html>`;

    fs.writeFileSync(`${config.build.dest.web}/index.html`, html);

    //folders('pages', (item, path) => console.log(item, path))

    next();
};