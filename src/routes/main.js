var html = require('choo/html')
var md = require('../methods/md')

module.exports = view

function view (state, emit) {
  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5 copy">
      ${typeof state.content !== 'undefined' ? md(state.content) : ''}
    </div>
  `
}

