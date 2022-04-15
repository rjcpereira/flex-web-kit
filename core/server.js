const config = require('flex-kit/builder/config'),
    express = require('express'),
    colors = require('colors'),
    server = express();

console.log(colors.red(config));

//const use = (req, res, next) => server.use(req, res, next);

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