var h = require('bel')
var md = require('../../methods/md')

module.exports = Intro

var img = url => h`
  <div class="psr" style="height: 0; padding-bottom: 100%">
    <img src="${url}" class="psa t0 l0 h100 w100">
  </div>
`

function Intro (opts) {
  var o = opts || { }
  var imgurl = [o.dir, o.path, o.image].join('/')

  var text = h`<div></div>`
  text.innerHTML = md.parse(o.text, o.path)

  return h`
    <div class="x xw p0-5 lh2">
      <div class="c4" md="c4"></div>
      <div class="c8 p0-5">
        jon-kyle 
      </div>
      <div class="c2" md="dn"></div>
      <div class="c2 p0-5" md="c4">
        ${img(imgurl)}
      </div>
      <div class="c7 p0-5 copy copy-indent" sm="c8">
        ${text}
      </div>
    </div>
  `
}
