const config = require('./config'),
fs = require('fs'),
gulp = require('gulp'),
shell = require('child_process').execSync;

module.exports = ({ next, views, layouts }) => {

    shell('mkdir -p ./dist/templates');

    for(let key in views) shell(`handlebars ${views[key].path} -f ./dist/templates/${key}.js`);

    next();

    //shell(`handlebars foo.hbs -f ./dist/foo.js`, next);
}