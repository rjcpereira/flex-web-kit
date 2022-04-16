const path = require('path'),
    fs = require('fs');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const build = {
    tasks: [
        'styles.parse',
        'scripts.parse',
        'views.parse',
        'layouts.parse',
        'routes.parse',
        'processed.templates',
        'api.parse',
        'server.parse',
        'handlebars.copy',
        'handlebars.precompile',
        'handlebars.parse',
        'assets.copy'
    ],
    dest: {
        server: 'dist',
        web: 'dist/web',
        temp: 'dist/temp'
    },
    module: `node_modules/${pkg.name}`
};

const port = 3000;

const base = process.env.BASE_URL || `http://localhost:${port}`;

const nodemon = {
    script: `./dist/server.js`,
    ext: 'js',
    env: {
        NODE_ENV: 'development',
        PORT: port
    },
    ignore: ['./node_modules/**'],
    delay: 2
};

const gulp = {
    watch: [
        'layouts/**/*',
        'pages/**/*',
        'styles/**/*',
        'views/**/*'
    ]
};

module.exports = {
    build,
    base,
    nodemon,
    gulp,
    port,
    pkg
};