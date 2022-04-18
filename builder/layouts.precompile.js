const config = require('./config'),
    fs = require('fs'),
    gulp = require('gulp'),
    colors = require('colors'),
    shell = require('child_process').execSync;

const { prepare } = require('./utils');

module.exports = ({ next, layouts }) => {

    shell(`mkdir -p ./${config.build.dest.temp}/templates/precompiled`);
    shell(`mkdir -p ./${config.build.dest.temp}/templates/compiled`);

    for (let key in layouts) {
        const file = `./${config.build.dest.temp}/templates/precompiled/${key}.hbs`;
        shell(`cp ${layouts[key].path} ${file}`);
        const template = fs.readFileSync(file, 'utf-8');
        fs.writeFileSync(file, prepare(template), 'utf-8');
        shell(`handlebars ${file} -f ./${config.build.dest.temp}/templates/compiled/${key}.js`);
    }

    next();
}