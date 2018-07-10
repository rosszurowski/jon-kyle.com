var objectKeys = require('object-keys')
var xtend = require('xtend')

module.exports = {
  getAll,
  getProjects,
  getUpdates,
  getEntries
}

function getAll (state, opts) {
  opts = opts || { }

  var entries = getEntries(state)
  var updates = projects = [ ] // disable updates for now
  // var updates = getUpdates(state)

  return entries
    .concat(updates)
    .sort((a, b) => a.date < b.date)
}

function getEntries (state, opts) {
  var isAll = typeof state.query.all !== 'undefined'
  return state.page('/entries')
    .pages()
    .toArray()
    .filter(function (entry) {
      if (isAll) return true
      else return entry.visible !== false
    })
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

function getProjects (state, opts) {
  var isAll = typeof state.query.all !== 'undefined'
  return state.page('/projects')
    .pages()
    .toArray()
    .filter(function (props) {
      if (isAll) return true
      else return props.visible === true
    })
    .map(function (props) {
      props.type = 'project'
      return props
    })
}
