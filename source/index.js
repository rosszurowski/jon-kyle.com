var html = require('choo/html')
var choo = require('choo')

var plugins = require('./plugins')
var routes = require('./routes')
var app = choo()

// plugins
Object.keys(plugins).forEach(function(plugin) {
  app.use(plugins[plugin])
})

// routes
Object.keys(routes).forEach(function (route) {
  if (routes[route].view) app.route(route, routes[route].view)
})

// public
if (module.parent) {
  module.exports = app
} else {
  app.mount('body')
}
