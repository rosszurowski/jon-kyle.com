module.exports = scroll

var lastHref = ''

function scroll (state, emitter) {
  emitter.on(state.events.DOMCONTENTLOADED, function () {
    lastHref = state.href || '/'
  })

  emitter.on('pushState', function () {
    var shouldScroll = state.href.indexOf('/entries') !== 0
    lastHref = state.href || '/'
    if (shouldScroll) window.scrollTo(0, 0)
  })
}
