var h = require('bel')

module.exports = Error

function Error (opts) {
  var o = opts || { }

  return h`
    <div class="p1">
      can not find entry
    </div>
  `
}
