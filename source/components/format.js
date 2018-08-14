require('intersection-observer')

var raw = require('choo/html/raw')
var md = require('markdown-it')({ html: true })
var iterator = require('markdown-it-for-inline')
var implicitFigures = require('markdown-it-implicit-figures')

md.use(iterator, 'data-src', 'image', function (tokens, idx) {
  var aIndex = tokens[idx].attrIndex('src');
  var src = tokens[idx].attrs[aIndex][1]

  if (aIndex >= 0) tokens[idx].attrs[aIndex][1] = ''
  tokens[idx].attrPush(['data-src', src])
})
 
md.use(implicitFigures, {
  dataType: true,
  figcaption: true,
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

md.use(require('markdown-it-anchor'))
md.use(require('markdown-it-footnote'))

module.exports = format

function format (str) {
  return raw(md.render(layout(str || '')))
}

function layout (str) {
  return str
    .replace(/{imgs-auto}/g, '<div class="imgs-auto">\n')
    .replace(/{\/imgs-auto}/g, '<\/div>\n')
}
