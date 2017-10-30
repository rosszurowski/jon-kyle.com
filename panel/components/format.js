var html = require('choo/html')
var md = require('markdown-it')()
var implicitFigures = require('markdown-it-implicit-figures')
 
md.use(implicitFigures, {
  dataType: true,
})

module.exports = format

function format (str) {
  console.log(str)
  var output = md(str || '')
  if (typeof window === 'undefined') {
    var wrapper = new String(output)
    wrapper.__encoded = true
    return wrapper
  } else {
    var el = html`<div></div>`
    el.innerHTML = output
    return [...el.childNodes]
  }
}
