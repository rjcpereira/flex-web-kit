const config = require('./config'),
    gulp = require('gulp'),
    rename = require('gulp-rename');

module.exports = () => gulp.src(['node_modules/handlebars/dist/handlebars.runtime.min.js'])
    .pipe(rename('handlebars.js'))
    .pipe(gulp.dest(`${config.build.dest.web}/scripts`));