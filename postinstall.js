const fs = require('fs'),
  colors = require('colors'),
  shell = require('child_process').exec;

fs.access(`${process.env.INIT_CWD}/gulpfile.js`, fs.F_OK, err => (err && shell(`cp -r base/. ${process.env.INIT_CWD}`, res => console.log(colors.red(res)))));

const gitignore = `${process.env.INIT_CWD}/.gitignore`;

fs.access(gitignore, err => (err && fs.writeFileSync(gitignore, `# folders
node_modules
dist

# files
package-lock.json`, 'utf-8')));