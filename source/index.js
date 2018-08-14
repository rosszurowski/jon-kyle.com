// globals
require('fetch-polyfill')

// modules
var css = require('sheetify')
var choo = require('choo')

// app
var app = choo({
  hash: false
})

// styles
css('./design/index.js')
css('./design/index.css')

// plugins
app.use(require('enoki/choo')())
app.use(require('./plugins/ui'))
app.use(require('./plugins/scroll'))

// routes
app.route('*', require('./views/wrapper'))

// public
module.exports = app.mount('body')
