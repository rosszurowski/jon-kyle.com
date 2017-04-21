var html = require('bel')

module.exports = Err

function Err (state, emit) {
  return html`
    <div class="p2">
      Not Found
    </div>
  `
}