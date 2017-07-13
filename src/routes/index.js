var wrapper = require('../containers/main')

module.exports = {
  '*': { view: wrapper(notfound) },
  '/': { view: wrapper(require('./main')) },
  '/1499916316': {
    content: '1499916316.txt',
    view: wrapper(require('./entry'))
  }
}

function notfound (state, emit) {
  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5 copy">
      Unknown
    </div>
  `
}
