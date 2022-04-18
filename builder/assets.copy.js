const config = require('../core/config');

const shell = require('child_process').exec;

module.exports = ({ next }) => {

    shell(`cp -r assets ${process.env.INIT_CWD}/${config.build.dest.web}`);

    next();
};