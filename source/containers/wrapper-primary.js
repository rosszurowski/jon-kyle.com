var h = require('bel')
var ui = require('../methods/ui')

function loaded (view) {
  ui.removeLoader()
  return view
}

function Primary (view) {
  return function (state, prev, send) {
    return state.loaded
      ? loaded(view(state, prev, send))
      : h`<div></div>`
  }
}

module.exports = Primary
