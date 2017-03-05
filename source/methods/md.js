var api = require('../methods/api')
var md = require('marked')
var pj = require('join-path')

var renderer = new md.Renderer()

md.setOptions({
  renderer: renderer,
  gfm: true,
  smartypants: false,
  breaks: true
})

renderer.image = function(href, title, text) {
  var apiHref = api.endpoint() + href
  var opts = text.split('!')
  var ratio = opts[0]
  var video = opts[1]

  return text
    ? `<span class="psr image ${video ? 'video' : ''}">
        <span
          class="db psr c12 b1b"
          style="padding-bottom: ${ratio}%"
        >
          <img
            src="${apiHref}"
            class="db psa t0 l0 w100 h100 ${video ? 'curp' : ''}"
            ${video ? 'data-video="' + video + '"' : ''}
            ${this.options.xhtml ? '/>' : '>'}
        </span>
      </span>`
    : `<img src="${apiHref}" ${this.options.xhtml ? '/>' : '>'}`
};

function parseImage (dir) {
  return function (whole, a, b, c) {
    return a + (dir + '/' + b) + c;
  }
}

function parseImages (str, dir) {
  return dir
    ? str
      .replace(/(!\[.*?\]\()(.+?)(\))/g, parseImage(dir))
      .replace(/—/g, '<div class="em2"></div>')
    : str
}

function parse (str, dir) {
  return str && dir
    ? md(parseImages(str, dir))
    : md(str)
}

function video (str, dir) {
  return str && dir
    ? pj(api.endpoint(), dir, str)
    : str
}

module.exports = {
  parse: parse,
  video: video
}
