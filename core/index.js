const nodemon = require('nodemon'),
    handlebars = require('handlebars'),
    gulp = require('gulp'),
    config = require('./config'),
    colors = require('colors'),
    shell = require('child_process').exec;

const { log } = require('./utils');

const renderer = {
    views: value => handlebars.registerPartial(value.key, value.view),
    helper: (key, next) => handlebars.registerHelper(key, next),
    layouts: {}
};

let options = {
    compile: template => handlebars.compile(template)
};

for (let key in renderer) options[key] = new Proxy(typeof renderer[key] !== 'object' ? {} : renderer[key], {
    get(target, prop) {
        return target[prop];
    },
    set(target, prop, value) {
        target[prop] = value;
        !(typeof renderer[key] !== 'function') && renderer[key](value);
        return true;
    }
});

const line = () => console.log('\n\r'),
    listening = dev => {
        line();
        log(`starting server in '${colors.cyan(!dev ? 'production' : 'development')}' mode`);
        line();
    },
    watching = next => {
        listening();
        log('watching files for changes...');
        line();
        return (next && next());
    },
    build = gulp.series(...config.build.tasks.map(id => {
        const task = require(`../builder/${id}`);
        gulp.task(id, next => task({
            ...options,
            next
        }));
        return id;
    })),
    start = async next => {

        listening();

        shell(`node dist/server`, err => {
            line();
            log(colors.red('ERROR'), err);
            line();
            next();
        });
    },
    watch = async () => {
        gulp.series(build, watching, () => nodemon(config.nodemon))();
        return gulp.watch(config.gulp.watch, gulp.series(build, watching));
    };;

line();
log(`building project with ${config.pkg.name} v${config.pkg.version}`);
line();

module.exports = {
    start,
    build,
    watch,
    dev: watch,
    options
};