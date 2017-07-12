var html = require('choo/html')

module.exports = log

function log (state, emit) {
  return html`
    <div>
      hello there log
    </div>
  `
}
