var html = require('choo/html')
var choo = require('choo')

var stores = require('./store')
var views = require('./views')
var main = require('./containers/main')

var app = choo()

// model
stores.forEach(function(store) {
  return app.use(store)
})

// routes
views.forEach(function (route) {
  return app.route(route.path, main(route.view))
})

// init
app.mount('body')
