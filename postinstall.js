const shell = require('child_process').exec;

shell(`
  if [ -d "assets" || -d "layouts" || -d "pages" || -d "styles" || -d "views" ]; 
    then
    else
        cp -r base/. ${process.env.INIT_CWD}
    exit 1
  fi
`);