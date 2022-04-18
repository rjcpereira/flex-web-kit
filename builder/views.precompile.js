const config = require('./config'),
    colors  = require('colors'),
    shell = require('child_process').execSync;

module.exports = ({ next, views }) => {

    shell(`mkdir -p ./${config.build.dest.temp}/templates/precompiled`);
    shell(`mkdir -p ./${config.build.dest.temp}/templates/compiled`);

    console.log(colors.red('TODO'), colors.yellow('minify html/hbs templates before'));

    for (let key in views) {
        const file = `./${config.build.dest.temp}/templates/precompiled/${views[key].path.replace(views[key].name, key + '.hbs')}`;
        console.log(views[key].path)
        console.log(file)
        console.log(views[key])
        shell(`cp ${views[key].path} ${file}`);
        shell(`handlebars ${file} -f ./${config.build.dest.temp}/templates/compiled/${key}.js`);
    }

    next();
}