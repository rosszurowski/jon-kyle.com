var api = require('../methods/api')
var md = require('marked')

var renderer = new md.Renderer()

md.setOptions({
  renderer: renderer,
  gfm: true,
  smartypants: false,
  breaks: true
})

renderer.image = function(href, title, text) {
  var apiHref = api.endpoint() + href
  return text
    ? `<span class="image"><span class="db psr c12 b1b" style="padding-bottom: ${text}%"><img src="${apiHref}" class="db psa t0 l0 w100 h100" ${this.options.xhtml ? '/>' : '>'}</span></span>`
    : `<img src="${apiHref}" ${this.options.xhtml ? '/>' : '>'}`
};

function parseImage (dir) {
  return function (whole, a, b, c) {
    return a + (dir + '/' + b) + c;
  }
}

function parseImages (str, dir) {
  return dir
    ? str.replace(/(!\[.*?\]\()(.+?)(\))/g, parseImage(dir))
    : str
}

function parse (str, dir) {
  return str
    ? md(parseImages(str, dir)).replace(/<p><\/p>/g, '')
    : ''
}

module.exports = {
  parse: parse
}
