var h = require('bel')
var Widget = require('../containers/widget')
var example = Widget()

function View (state, prev, send) {
  return h`
    <div>
      <div>
        <span>01-20-17</span>
        <span>example heading to see how it feels</span>
      </div>
      <div>
        <span>01-23-17</span>
        <span>another head bc why not</span>
      </div>
    </div>
  `
}

module.exports = View
