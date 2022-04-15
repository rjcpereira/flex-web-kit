const config = require('./config'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean-css'),
    sass = require('gulp-sass')(require('sass'));

module.exports = () => gulp.src(['styles/**/*.scss'])
    .pipe(sass())
    .pipe(concat(`main.css`))
    .pipe(clean())
    .pipe(gulp.dest(`${config.build.dest.web}/styles`));