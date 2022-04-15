const config = require('flex-web-kit/builder/config'),
    utils = require('flex-web-kit/builder/utils'),
    express = require('express'),
    colors = require('colors'),
    server = express();

utils.folders('dist/web', (name, path) => {
    console.log(path)
    const file = require(path);
    console.log(file)


    //const use = (req, res, next) => server.use(req, res, next);
});


server.get('/dev', (req, res) => res.send({
    id: config.pkg.name
}));

server.use(express.static(config.build.dest.web));

const line = () => console.log('\n\r');

server.listen(config.port, () => {
    line();
    console.log(colors.green(`[${config.pkg.name}]`), colors.yellow(config.base));
    line();
});