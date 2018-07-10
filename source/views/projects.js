var html = require('choo/html')

var projectThumb = require('../components/project-thumb')
var format = require('../components/format')
var libEntries = require('../lib/entries')

module.exports = view

function view (state, emit) {
  var props = state.page().v()
  var projects = libEntries.getProjects(state) 

  return html`
    <div class="p0-5 x xw xafe w100" style="margin-top: -20vh">
      ${projects.map(createProject)}
    </div>
  `

  function createProject (props) {
    var file = state.page(props).files().toArray()[0]
    return html`
      <div class="c3 py3-5 px0-5" sm="c6">
        <a href="${props.url}" class="db tdn tc-white project-thumb">
          ${projectThumb(file)}
          <div class="mt1">${props.title}</div>
        </a>
      </div>
    `
  }
}
