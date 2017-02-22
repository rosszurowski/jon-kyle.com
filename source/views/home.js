var h = require('bel')
var Widget = require('../containers/widget')
var example = Widget()

function View (state, prev, send) {
  return h`
    <main class="ff-mono fs1 p2">
      <span class="ff-mono">01-20-17</span>
      <span>example heading to see how it feels</span>
    </main>
  `
}

module.exports = View
