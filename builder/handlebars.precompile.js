const config = require('./config'),
    colors  = require('colors'),
    shell = require('child_process').execSync;

module.exports = ({ next, views, layouts }) => {

    shell(`mkdir -p ./${config.build.dest.temp}/templates`);

    console.log(colors.red('TODO'), colors.yellow('minify html/hbs templates before'));

    const templates = {
        ...(views || {}),
        ...(layouts || {})
    }

    for (let key in templates) {
        console.log(key, templates[key])
        const file = templates[key].path.replace('/layouts', '/views').replace(templates[key].name, key + '.hbs');
        console.log(file)
        shell(`mv ${templates[key].path} ${file}`);
        shell(`handlebars ${file} -f ./${config.build.dest.temp}/templates/${key}.js`);
    }

    next();
}