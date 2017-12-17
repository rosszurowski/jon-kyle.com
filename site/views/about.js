var wrapper = require('../containers/wrapper')
var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="fs1 pb1 lh1-5">
      <div class="x" style="min-height: 25vh">
        <div class="p1 w20" sm="dn"></div>
        <div class="p1 copy-links">${md(state.page.text)}</div>
      </div>
      <div class="x xw">
        <div class="c12 x xw">
          <div class="p1 w20" sm="c12">Ongoing</div>
          <div class="p1 copy">${md(state.page.ongoing)}</div>
        </div>
        <div class="c12 x xw">
          <div class="p1 w20" sm="c12">Collaborations</div>
          <div class="p1 copy">${md(state.page.collaborations)}</div>
        </div>
        <div class="c12 x xw">
          <div class="p1 w20" sm="c12">Misc</div>
          <div class="p1 copy">${md(state.page.misc)}</div>
        </div>
      </div>
    </div>
  `
}
