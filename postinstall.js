const fs = require('fs'),
  colors = require('colors'),
  shell = require('child_process').exec;

fs.access(`${process.env.INIT_CWD}/gulpfile.js`, fs.F_OK, err => (err && shell(`cp -r base/. ${process.env.INIT_CWD}`, res => console.log(colors.red(res)))));