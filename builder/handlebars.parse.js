const config = require('./config'),
fs = require('fs'),
gulp = require('gulp'),
    rename = require('gulp-rename');

module.exports = ({ next, views, layouts }) => {

    console.log(views, layouts);
    next();

    //shell(`handlebars foo.hbs -f ./dist/foo.js`, next);
}