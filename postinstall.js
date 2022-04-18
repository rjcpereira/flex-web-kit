const colors = require('colors'),
  shell = require('child_process').exec;

shell(`! [-f ${process.env.INIT_CWD}/gulpfile.js ] && cp -r base/. ${process.env.INIT_CWD}`, res => console.log(colors.red(res)));