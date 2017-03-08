var h = require('bel')
var x = require('xtend')
var ok = require('object-keys')

var Header = require('./header')
var Seperator = require('../components/seperator')
var ui = require('../methods/ui')

var View = (view, opts) => (state, prev, send) => {
  var o = x({
    bg: 'white',
    tc: 'black',
    active: ''
  }, state.options, opts)

  var isLoaded = ok(state.content).length > 0

  var header = state.content['site-header']
    ? Header(x(state.content['site-header'], {
      active: o.active,
      filter: state.location.params.filter || state.options.filter
    }))
    : h`<div></div>`

  var container = h`
    <div class="
      ff-sans fs1 lh2
      tc-${o.tc} bg-${o.bg}
      vhmn100
    ">
      ${header}
      ${view(state, prev, send)}
    </div>
  `

  state.location.params.page &&
  ok(state.options.entriesActive).length <= 0 &&
  !state.options.justSorted
    ? send('entryActive', {
        entryActive: state.location.params.page,
        entryStart: state.location.params.page
      })
    : ''

  state.location.params.filter !== state.options.filter &&
  !state.location.params.page
    ? send('options', {
      filter: state.location.params.filter,
      entriesActive: [ ]
    })
    : ''

  isLoaded
    ? ui.removeLoader()
    : ''

  return isLoaded
    ? container
    : h`<div></div>`
}

module.exports = View
