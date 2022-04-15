const shell = require('child_process').exec;

shell(`cp -r base/. ${process.env.INIT_CWD}`);