var html = require('choo/html')
var md = require('markdown-it')({ html: true })
var implicitFigures = require('markdown-it-implicit-figures')
 
md.use(implicitFigures, {
  dataType: true,
})

md.use(require('markdown-it-video', {
  youtube: { width: 640, height: 390 },
  vimeo: { width: 500, height: 281 }
}))

md.use(require('markdown-it-html5-embed'), {
  html5embed: {
    useImageSyntax: true,
    useLinkSyntax: true,
    inline: true,
    attributes: {
      video: 'preload="metadata"'
    }
}})

module.exports = format

function format (str) {
  var output = md.render(str || '')
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
