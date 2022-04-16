const config = require('./config'),
    gulp = require('gulp'),
    babel = require('gulp-babel');

module.exports = () => gulp.src(['dist/temp/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest(`${config.build.dest.web}/scripts/templates`));