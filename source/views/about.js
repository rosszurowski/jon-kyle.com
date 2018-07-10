var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var page = state.page().value()
  
  return html`
    <div class="fs1 pb1 lh1-5 max-width">
      <div class="x" style="min-height: 25vh">
        <div class="p1 c3" sm="dn"></div>
        <div class="p1 copy-links" sm="c12">${md(page.text)}</div>
      </div>
      <div class="x xw">
        <div class="c12 x xw mb2">
          <div class="p1 c3" sm="c12">Ongoing</div>
          <div class="p1 copy">${md(page.ongoing)}</div>
        </div>
        <div class="c12 x xw mb2">
          <div class="p1 c3" sm="c12">Collaborations</div>
          <div class="p1 copy">${md(page.collaborations)}</div>
        </div>
        <div class="c12 x xw mb2">
          <div class="p1 c3" sm="c12">Misc</div>
          <div class="p1 copy">${md(page.misc)}</div>
        </div>
      </div>
    </div>
  `
}
