var html = require('choo/html')
var md = require('nano-markdown')

module.exports = view

function view (state, emit) {
  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5 copy">
      ${format(state.content)}
    </div>
  `
}

function format (str) {
  var output = md(str)
  if (typeof global.window === 'undefined') {
    var wrapper = new String(output)
    wrapper.__encoded = true
    return wrapper
  } else {
    var el = html`<div class="copy"></div>`
    el.innerHTML = output
    return el
  }
}
