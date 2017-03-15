var h = require('bel')
var x = require('xtend')

var Block = require('../components/block')
var mb = require('../methods/blocks')

module.exports = Blocks

function Blocks (state, send) {
  var blocks = mb.getBlocks(
    state.visitor.blocks,
    state.content
  )
    .map(b => [
      Block(x(b, { dir: state.endpoint } )),
      spacer()
    ])

  return blocks
}

function spacer () {
  return h`<div style="height: 50vh"></div>`
}