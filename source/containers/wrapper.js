var h = require('bel')
var x = require('xtend')
var ok = require('object-keys')

var Header = require('./header')
var Seperator = require('../components/seperator')

var View = (view, opts) => (state, prev, send) => {
  var o = x({
    bg: 'white',
    tc: 'black',
    active: ''
  }, state.options, opts)

  var header = state.content.about
    ? Header(x(state.content.about, {
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
      ${Seperator()}
      ${view(state, prev, send)}
      ${Seperator()}
    </div>
  `

  var loading = h`
    <div class="ff-sans fs1 lh2 x xjc xac vw100 vh100">
      <div>loading</div>
    </div> 
  `

  state.location.params.page &&
  ok(state.options.entriesActive).length <= 0
    ? send('entryActive', state.location.params.page)
    : ''

  state.location.params.filter !== state.options.filter &&
  !state.location.params.page
    ? send('options', {
      filter: state.location.params.filter,
      entriesActive: [ ]
    })
    : ''

  return ok(state.content).length > 0
    ? container
    : loading
}

module.exports = View
