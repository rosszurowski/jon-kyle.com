var npath = require('path')
var xhr = require('xhr')
var fs = require('fs')
var text = fs.readFileSync(npath.join(__dirname, '../../static/content.txt'), 'utf8')

module.exports = content

function content (state, emitter) {
  state.content = text
  var inbrowser = typeof window !== 'undefined'

  emitter.on(state.events.DOMCONTENTLOADED, load)
  emitter.on(state.events.NAVIGATE, load)

  function load (data) {
    var route = window.location.pathname.replace(/\/$/, '')

    // load
    if (inbrowser && route && !state[route]) {
      xhr(npath.join(route, 'content.txt'), function (req, res, body) {
        state[route] = body
        emitter.emit(state.events.RENDER)
      })
    }

    // scroll
    if (inbrowser) window.scrollTo(0, 0)
  }
}
