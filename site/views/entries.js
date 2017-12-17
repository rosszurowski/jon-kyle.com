var wrapper = require('../containers/wrapper')
var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

var log = require('../components/log')
var Content = require('../components/content')
var content = new Content()

module.exports = wrapper(view)

function view (state, emit) {
  var entries = ov(state.content.children.entries.children).reverse()

  return html`
    <div class="px1" style="margin: -1px 0;">
      ${log(entries)}
    </div>
  `
}

