const config = require('./config'),
    fs = require('fs'),
    colors = require('colors');

const log = (...args) => console.log(colors.green(`[${config.pkg.name}]`), ...args);

const folders = (value, next, get) => {
    let res = {};
    const scan = dir => {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        files.map(file => {
            const path = `${dir}/${file}`;
            if (fs.lstatSync(path).isDirectory()) scan(path);
            else {
                res[path] = !get ? true : fs.readFileSync(path, 'utf-8');
                if (next) next(file, path, res[path]);
            }
        });
    };
    scan(value);
    return res;
};

const routify = (dir, item, path, ext) => {
    if (!dir || !item || !path) return;
    if (!ext) ext = '.hbs';
    if (!item.endsWith(ext)) return;
    const name = item.replace(ext, '');
    return path.replace(`${dir}/`, '').replace(ext, '').replace(`${name}/${name}`, name).replace(/\//g, '-') || '';
};

const line = () => console.log('\n\r');

const listening = dev => {
    line();
    log(`starting server in '${colors.cyan(!dev ? 'production' : 'development')}' mode`);
    line();
    log(colors.yellow(process.env.BASE_URL || 'http://localhost:3000'));
    line();
};

const watching = next => {
    listening();
    log('watching files for changes...');
    line();
    return (next && next());
};

const prepare = html => !html ? '' : html
    .replace(/\t/g, '')
    .replace(/\r/g, '')
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')/* 
    .replace(/{{>(.+?)}}/g, (match, path) => `<!-- {{#${path}}} -->${match}<!-- {{/${path}}} -->`) */;

module.exports = {
    log,
    folders,
    routify,
    line,
    watching,
    prepare
}