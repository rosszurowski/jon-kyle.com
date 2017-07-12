var html = require('choo/html')
var md = require('../methods/md')

module.exports = view

function view (state, emit) {
  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5 copy">
      ${state[state.route] ? content() : loading() }
    </div>
  `

  function content () {
    return [
      md(state[state.route]),
      html`<h2>← <a href="/">Index</a></h2>`
    ]
  }

  function loading () {
    return html`<h2>Loading…</h2>`
  }
}

