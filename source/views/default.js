var html = require('choo/html')
var md = require('../components/format')

module.exports = view

function view (state, emit) {
  return html`
    <body>
      <div class="p1 fs1 lh1-5 copy">
        Not found, head back <a href="/">home</a>?
      </div>
    </body>
  `
}

