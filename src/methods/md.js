var html = require('choo/html')
var md = require('marked')

module.exports = format

function format (str) {
  var output = md(str)
  if (typeof global.window === 'undefined') {
    var wrapper = new String(output)
    wrapper.__encoded = true
    return wrapper
  } else {
    var el = html`<div class="copy"></div>`
    el.innerHTML = output
    return [...el.childNodes]
  }
}

