const config = require('./config'),
    colors  = require('colors'),
    shell = require('child_process').execSync;

module.exports = ({ next, layouts }) => {

    shell(`mkdir -p ./${config.build.dest.temp}/layouts`);

    console.log(colors.red('TODO'), colors.yellow('minify html/hbs layouts before'));

    for (let key in layouts) {
        const file = layouts[key].path.replace(layouts[key].name, key + '.hbs');
        shell(`mv ${layouts[key].path} ${file}`);
        shell(`handlebars ${file} -f ./${config.build.dest.temp}/layouts/${key}.js`);
    }

    next();
}