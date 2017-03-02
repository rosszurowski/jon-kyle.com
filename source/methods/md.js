var api = require('../methods/api')
var md = require('marked')

var renderer = new md.Renderer()

md.setOptions({
  renderer: renderer,
  gfm: true,
  smartypants: false,
  breaks: true
})

renderer.image = function (href, title, alt) {
  var apiHref = api.endpoint() + href
  return alt
    ? `<div
        class="psr c12 bg-black"
        style="padding-bottom: ${alt}%"
      >
        <img src="${apiHref}" class="psa t0 l0 w100 h100">
      </div>`
    : `<img src="${apiHref}">`
}

module.exports = md
