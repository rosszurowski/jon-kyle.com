var api = require('./api')
var md = require('marked')
var pj = require('join-path')

var renderer = new md.Renderer()

md.setOptions({
  renderer: renderer,
  gfm: true,
  smartypants: false,
  breaks: true
})

function parseOptions (str) {
  var opts = str ? str.split('--') : [ ]
  var result = { }

  opts.forEach((opt, i) => {
    var keyOpts = opt.trim().split(' ')
    var key = keyOpts.splice(0, 1).join()

    if (key === 'video') {
      result.video = keyOpts.join()
    } else if (key === 'style') {
      result.style = keyOpts.join(' ')
    } else {
      result.ratio = key
    }
  })

  return result
}

renderer.image = function(href, title, text) {
  var apiHref = api + href
  var opts = parseOptions(text)

  return text
    ? `<span class="psr image ${opts.video ? 'video' : ''} ${opts.style}">
        <span
          class="db psr c12"
          style="padding-bottom: ${opts.ratio}%"
        >
          <img
            src="${apiHref}"
            class="db psa t0 l0 w100 h100 ${opts.video ? 'curp' : ''}"
            ${opts.video ? 'data-video="' + opts.video + '"' : ''}
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
