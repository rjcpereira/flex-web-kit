const config = require('./config'),
    gulp = require('gulp'),
    minify = require('gulp-htmlmin');

module.exports = () => gulp.src(['dist/temp/**/*.js'])
    .pipe(minify())
    .pipe(gulp.dest(`${config.build.dest.web}/scripts/templates`));