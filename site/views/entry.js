var html = require('choo/html')
var md = require('../components/format')
var wrapper = require('../containers/wrapper')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5 copy" sm="px1-5">
      <div style="min-height: 25vh">
        <h1>${state.page.title}</h1>
      </div>
      ${md(state.page.text)}
      <h2><a href="/"><div class="back">←</div>Index</a></h2>
    </div>
  `
}

