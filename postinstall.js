const shell = require('child_process').exec;

shell(`
install=0

for dir in \
  "assets" \
  "layouts" \
  "pages"  \
  "styles"  \
  "pages" 
do
  if ! [ -d "${process.env.INIT_CWD}/$dir" ]; then
    install=1
    break
  fi
done

if [ install == 1 ]; then
  cp -r base/. ${process.env.INIT_CWD}
fi
`);