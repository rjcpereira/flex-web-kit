const config = require('../core/config'),
    gulp = require('gulp'),
    minify = require('gulp-minify'),
    replace = require('gulp-replace');

module.exports = () => gulp.src(['dist/temp/templates/compiled/**/*.js'])
    .pipe(replace('.hbs', ''))
    .pipe(replace(', templates = Handlebars.templates = Handlebars.templates || {}', ''))
    .pipe(replace('templates[', 'flex.views['))
    .pipe(minify({
        ext:{
            min:'.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest(`${config.build.dest.web}/scripts/views`));