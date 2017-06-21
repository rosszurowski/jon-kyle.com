var npath = require('path')
var fs = require('fs')

var text = fs.readFileSync(npath.join(__dirname, '../content/content.md'), 'utf8')

module.exports = content

function content (state, emitter) {
  state.content = text
}
