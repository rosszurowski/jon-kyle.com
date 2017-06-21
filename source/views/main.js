var html = require('choo/html')
var md = require('nano-markdown')

module.exports = view

function view (state, emit) {
  var content = html`<div class="copy"></div>`
  content.innerHTML = md(state.content)

  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5">
      ${content}
    </div>
  `
}
