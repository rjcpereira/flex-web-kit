const colors = require('colors'),
  shell = require('child_process').exec;

shell(`
if ! [-f ${process.env.INIT_CWD}/gulpfile.js ]
then
  cp -r base/. ${process.env.INIT_CWD}
fi
`, res => console.log(colors.red(res)));