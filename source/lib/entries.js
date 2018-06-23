var objectKeys = require('object-keys')
var xtend = require('xtend')

module.exports = {
  getAll
}

function getAll (state, opts) {
  opts = opts || { }

  var entries = getEntries(state)
  var updates = [ ] // disable updates for now
  // var updates = getUpdates(state)

  return entries
    .concat(updates)
    .sort((a, b) => a.date < b.date)
}

function getEntries (state, opts) {
  return state.page('/entries')
    .pages()
    .visible()
    .toArray()
    .map(function (entry) {
      entry.type = 'entry'
      return entry
    })
}

function getUpdates (state, opts) {
  var updates = state.page('/updates').v()
  return objectKeys(updates)
    .filter(function (key) {
      return ['files', 'name', 'pages', 'path', 'title', 'url'].indexOf(key) < 0
    })
    .map(function (key) {
      return {
        date: key,
        type: 'update',
        text: updates[key]
      }
    })
}
