# flex-kit

Create static SSR websites with reactivity on the client

> _project under development..._

## Install

`npm i flex-kit`

### Dependencies

`flex-kit` uses `gulp`, it's probably required to install it globally

`npm i -g gulp`

## Run in development mode

`gulp dev`

## Build for production

`gulp` or `gulp build`

## Start server

`gulp start`


## Directory structure

### assets

> This folder and it's files will be copied to dist

### layouts

> All `.hbs` layouts that will be used by page templates

### pages

> Router `.hbs` templates

### server

#### api

> Extend `express` server instance

#### middleware

> Middlewares that will be applied in `express` server

### styles

> `SCSS` styles that will be merged into one signle `CSS` file

### views

> `.hbs` templates to be imported in pages and layouts