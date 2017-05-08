var xtendm = require('xtend/mutable')
var objectKeys = require('object-keys')
var xhr = require('xhr')
var api = require('../methods/api')

var endpoint = api + 'data.json'

module.exports = content

function content (state, emitter) {
  state.content = { }

  // init
  xhr(endpoint, function (err, data, body) {
    var result = JSON.parse(body)
    var content = { }
    
    objectKeys(result).forEach(function(id) {
      var entry = result[id]
      entry.id = id
      content[id] = entry
    })

    state.content = content
    emitter.emit('commits:init')
    emitter.emit('render')
  })
}
