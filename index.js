var html = require('choo/html')
var choo = require('choo')
var config = require('./app')

// wrap choo in cms
var app = config(choo())

// plugins
app.use(require('./plugins/scroll'))

// public
if (module.parent) {
  module.exports = app
} else {
  app.mount('main')
}
