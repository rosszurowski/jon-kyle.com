var h = require('bel')

var Blocks = require('../containers/blocks')

module.exports = View

function View (state, prev, send) {
  var blocks = Blocks(state, send)

  return h`
    <div class="ff-sans fs1">
      ${blocks}
    </div>
  `
}
