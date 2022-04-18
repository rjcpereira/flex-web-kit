const config = require('./config'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    replace = require('gulp-replace');

module.exports = () => gulp.src(['dist/temp/layouts/**/*.js'])
    .pipe(replace('.hbs', ''))
    .pipe(replace(', templates = Handlebars.templates = Handlebars.templates || {}', ''))
    .pipe(replace('templates[', 'flex.views['))
    .pipe(babel())
    .pipe(gulp.dest(`${config.build.dest.web}/scripts/views`));