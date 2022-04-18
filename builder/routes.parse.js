const config = require('./config'),
    fs = require('fs');

const { prepare } = require('./utils');

/* const { log, folders } = require('./utils'); */

module.exports = ({ next, layouts, compile, views }) => {

    const render = compile(layouts.base.view);

    const main = {
        '@route': {
            path: '',
            params: {}
        },
        '@url': config.base
    };

    const data = {
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
    };

    const body = render(data);

    const templates = [];
    if(views) for(let key in views) templates.push(`<script type="application/javascript" defer src="${config.base}/scripts/views/${key}.js?v=${config.pkg.version}"></script>`)

    const html = `<!DOCTYPE html>
        <html>
            <head>
                <title></title>
                <meta name="version" content="${config.pkg.version}">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <script type="application/javascript" src="${config.base}/scripts/handlebars.js?v=${config.pkg.version}"></script>
                <script type="application/javascript" src="${config.base}/scripts/site.js?v=${config.pkg.version}"></script>
                <script type="application/javascript">flex.data = flex.utils.reactive(${JSON.stringify(data) || {}}, () => {
                    let html = document.createElement('body');
                    html.innerHTML = flex.views.base(flex.data);
                    flex.dom.mergeElements(document.body, html);
                });</script>
                <link rel="stylesheet" href="${config.base}/styles/main.css?v=${config.pkg.version}">
                <script type="application/javascript" src="${config.base}/scripts/views/base.js?v=${config.pkg.version}"></script>
                ${templates.join('')}
            </head>
            <body>${body}</body>
        </html>`;

    fs.writeFileSync(`${config.build.dest.web}/index.html`, prepare(html));

    //folders('pages', (item, path) => console.log(item, path))

    next();
};