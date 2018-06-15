var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

var log = require('../components/log')
var Content = require('../components/content')
var content = new Content()

module.exports = view

function view (state, emit) {
  var entries = state.page('/entries').pages().visible().toArray().reverse()

  return html`
    <div>
      ${log({
        entries: entries, 
        selected: state.ui.listSelected
      }, emit)}
    </div>
  `
}

