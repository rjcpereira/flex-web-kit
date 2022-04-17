const config = require('./config'),
    colors  = require('colors'),
    shell = require('child_process').execSync;

module.exports = ({ next, views }) => {

    shell(`mkdir -p ./${config.build.dest.temp}/templates`);

    console.log(colors.red('TODO'), colors.yellow('minify html/hbs templates before'));

    for (let key in views) {
        const file = views[key].path.replace(views[key].name, key + '.hbs');
        shell(`mv ${views[key].path} ${file}`);
        shell(`handlebars ${file} -f ./${config.build.dest.temp}/templates/${key}.js`);
    }

    next();
}