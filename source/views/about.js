var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

module.exports = view

function view (state, emit) {
  var page = state.page().value()
  
  return html`
    <div class="x xw fs1 pb1 lh1-5 max-width">
      <div class="p1 c4 co4 mb3" sm="c12 co3">
        <div class="psr bg-greylight" style="padding-bottom: 133.3%">
          <img src="/assets/josha-tree-portrait.jpg" class="psa t0 l0 h100 w100">
        </div>
      </div>
      <div class="x xw c12 tac mb3" sm="c12">
        <div class="c4 p1">
          <span class="ffmono">(Location)</span><br>Los Angeles, Calif.
        </div>
        <div class="c4 p1 copy-links">
          <span class="ffmono">(Contact)</span><br><a href="mailto:contact@jon-kyle.com">contact@jon-kyle.com</a>
        </div>
        <div class="c4 p1 copy-links">
          <span class="ffmono">(Social)</span><br><a href="https://github.com/jondashkyle/jon-kyle.com" target="_blank">Github</a>, <a href="http://twitter.com/jondashkyle" target="_blank">Twitter</a>, <a href="https://www.are.na/jon-kyle-mohr/" target="_blank">Arena</a>
        </div>
      </div>
    </div>
  `
}
