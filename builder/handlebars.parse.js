const config = require('./config'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    replace = require('gulp-replace');

module.exports = () => gulp.src(['dist/temp/templates/**/*.js'])
    .pipe(replace('.hbs', ''))
    .pipe(replace('Handlebars', 'flex'))
    .pipe(babel())
    .pipe(gulp.dest(`${config.build.dest.web}/scripts/templates`));