var html = require('bel')

module.exports = History

function Commit (state, emit) {
  return html`
    <a href=${state.url} target="_blank" class="tc-black tdn x xw hcbb1">
      <div class="c6 p1 ff-mono" sm="c12 pb0">
        ${state.date}
      </div>
      <div class="c6 p1" sm="c12 pt0">
        <span class="hbb1">${state.message}</span>
      </div>
    </a>
  `
}

function History (state, emit) {
  var commits = state.commits
    .map(commit => Commit(commit, emit))

  return html`
    <div class="p1">
      ${commits}
    </div>
  `
}