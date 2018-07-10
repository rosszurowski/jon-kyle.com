var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

var Content = require('../components/content')
var libEntries = require('../lib/entries')
var log = require('../components/log')

module.exports = view

function view (state, emit) {
  var entry = state.page().value()
  var entries = libEntries.getAll(state)
    .filter(function (props) {
      return props.name !== entry.name
    })

  return [
    state.cache(Content, 'content').render(entry),
    log(state, emit)
  ]
}
