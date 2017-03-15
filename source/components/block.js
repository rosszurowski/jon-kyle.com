var h = require('bel')
var x = require('xtend')

var blocks = require('./blocks')

module.exports = Block

function Block (opts) {
  var o = opts || { }
  var template = o.template || 'default'
  var block = o.title
    ? blocks[template]
    : blocks.error
  return typeof block === 'function'
    ? block(opts)
    : ''
}
