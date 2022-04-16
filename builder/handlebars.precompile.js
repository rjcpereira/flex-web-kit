const config = require('./config'),
    shell = require('child_process').execSync;

module.exports = ({ next, views }) => {

    shell(`mkdir -p ./${config.build.dest.temp}/templates`);

    for (let key in views) shell(`handlebars ${views[key].path} -f ./${config.build.dest.temp}/templates/${key}.js`);

    next();
}