var xtend = require('xtend')
var views = require('../views')

module.exports = plugin

function plugin (content) {
  return function (state, emitter, app) {
    state.content = { }
    content.forEach(function (route) {
      var view = views[route.view] || views.default
      app.route(route.url, function (state, emit) {
        return view(xtend({ page: route }, state), emit)
      })
      console.log(route)
    })
  }
}