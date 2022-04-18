const config = require('../core/config'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

module.exports = () => gulp.src(['dist/temp/layouts/**/*.js'])
    .pipe(replace('.hbs', ''))
    .pipe(replace(', templates = Handlebars.templates = Handlebars.templates || {}', ''))
    .pipe(replace('templates[', 'flex.views['))
    .pipe(uglify())
    .pipe(gulp.dest(`${config.build.dest.web}/scripts/views`));