const shell = require('child_process').exec;

shell(`for dir in \
  "assets" \
  "layouts" \
  "pages" 
do
  if ! [ -d "$dir" ]; then
    cp -r base/$dir ${process.env.INIT_CWD}
  fi
done`);

