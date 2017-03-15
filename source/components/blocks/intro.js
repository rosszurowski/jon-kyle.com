var h = require('bel')

module.exports = Intro

function Intro (opts) {
  var o = opts || { }
  var img = [o.dir, o.path, o.image].join('/')

  return h`
    <div class="x p0-5">
      <div class="c2" md="dn"></div>
      <div class="c2 p0-5" md="c4">
        <img src="${img}" class="c12">
      </div>
      <div class="c3 p0-5">
        <span>INTRO ${o.testing}</span>
      </div>
    </div>
  `
}
