var html = require('choo/html')
var md = require('../components/format')
var wrapper = require('../containers/wrapper')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5 copy">
      Not found
    </div>
  `
}

