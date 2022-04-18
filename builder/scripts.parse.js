const config = require('../core/config'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    wrap = require('gulp-wrap'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

module.exports = () => gulp.src([`${config.build.module}/core/js/**/*.js`])
    .pipe(wrap('(() => { <%= contents %> })();'))
    .pipe(concat(`site.js`))
    .pipe(wrap('window.flex = {}; (() => { <%= contents %> })();'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(`${config.build.dest.web}/scripts`));