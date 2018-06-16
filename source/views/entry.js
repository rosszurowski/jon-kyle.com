var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

var log = require('../components/log')
var Content = require('../components/content')

module.exports = view

function view (state, emit) {
  var entry = state.page().value()
  var entries = state.page('/entries')
    .pages()
    .visible()
    .toArray()
    .reverse()
    .filter(function (props) {
      return props.name !== entry.name
    })

  return html`
    <div style="border-top: 1px solid transparent">
      ${state.cache(Content, 'content').render(entry)} 
      <div>
        ${log({
          entries: entries, 
          active: entry.url,
          selected: state.ui.listSelected
        }, emit)}
      </div>
    </div>
  `
}

