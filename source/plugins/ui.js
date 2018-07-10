var xtend = require('xtend')

module.exports = plugin

function plugin (state, emitter) {
  state.ui = {
    listSelected: '',
    videoActive: '',
    logPaginationAmount: 3,
    logPaginationPrev: 0,
    logPaginationNext: 0
  }

  state.events.UI = 'ui'

  emitter.on(state.events.UI, function (data) {
    data = data || { }
    var shouldRender = data.render !== false
    state.ui = xtend(state.ui, data)
    if (shouldRender) emitter.emit(state.events.RENDER)
  })
}
