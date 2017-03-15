var x = require('xtend')

module.exports = {
  getBlocks: getBlocks
}

function getBlocks (active, content) {
  active = active || [ ]
  content = content || { }
  return active.map(e => content[e])
}