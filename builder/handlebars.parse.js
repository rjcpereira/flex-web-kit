const config = require('./config'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    replace = require('gulp-replace');

module.exports = () => gulp.src(['dist/temp/templates/**/*.js'])
    .pipe(replace('.hbs', ''))
    .pipe(replace('Handlebars.templates = Handlebars.templates || {}', 'flex.views'))
    .pipe(babel())
    .pipe(gulp.dest(`${config.build.dest.web}/scripts/templates`));