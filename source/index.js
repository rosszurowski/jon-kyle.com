var loadCss = require('fg-loadcss').loadCSS
var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')
var app = choo()

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
