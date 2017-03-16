var h = require('bel')
var md = require('../../methods/md')

module.exports = Entry

function Entry (opts) {
  var o = opts || { }

  var text = h`<div></div>`
  text.innerHTML = md.parse(o.text, o.path)

  return h`
    <div class="x xw p0-5 lh2" sm="p1">
      <div class="c4 p0-5" sm="c12">
        ${o.title}
      </div>
      <div class="c8 p0-5 copy copy-indent" sm="c12">
        ${text}
      </div>
    </div>
  `
}
