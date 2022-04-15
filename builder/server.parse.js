const config = require('./config'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify');

module.exports = () => gulp.src([`${config.build.module}/core/server.js`])
    .pipe(uglify())
    .pipe(gulp.dest(config.build.dest.server));