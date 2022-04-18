const config = require('../core/config'),
    fs = require('fs'),
    shell = require('child_process').execSync;

const { prepare } = require('../core/utils');

module.exports = ({ next, views }) => {

    shell(`mkdir -p ./${config.build.dest.temp}/templates/precompiled`);
    shell(`mkdir -p ./${config.build.dest.temp}/templates/compiled`);

    for (let key in views) {

        const file = `./${config.build.dest.temp}/templates/precompiled/${key}.hbs`;
        shell(`cp ${views[key].path} ${file}`);

        const template = fs.readFileSync(file, 'utf-8');
        fs.writeFileSync(file, prepare(template), 'utf-8');

        const compiled = `${config.build.dest.temp}/templates/compiled/${key}.js`;
        shell(`handlebars ${file} -f ./${compiled}`);
    
        let script = views[key].path.replace('.hbs', '.js');
        script = (!fs.existsSync(script) ? null : fs.readFileSync(script)) || '';

        let style = views[key].path.replace('.hbs', '.css');
        style = (!fs.existsSync(style) ? null : fs.readFileSync(style)) || '';

        fs.appendFileSync(compiled, `(() => {
            ${!script ? '' : `flex.scripts['${key}'] = () => { ${script} };`}
            ${!style ? '' : `flex.styles['${key}'] = '${style}';`}
        })();`);
    }

    next();
}