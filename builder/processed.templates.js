const colors = require('colors');

const { log, line } = require('./utils');

module.exports = ({ next, ...params }) => {

    line();
    
    ['views', 'layouts', 'pages'].forEach(item => {
        const total = !params[item] ? 0 : Object.keys(params[item]).length;
        if(total) {
            log('processed', colors.yellow(Object.keys(params[item]).length), item);
            line();
        }
    });

    next();
};