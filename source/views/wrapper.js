var html = require('choo/html')
var path = require('path')

var Mailinglist = require('../components/mailinglist')
var manifest = require('../../manifest')
var views = require('./')

module.exports = main

function main (state, emit) {
  var page = state.content[state.href || '/']

  // loading / 404
  if (!state.site.loaded) return renderLoading(state, emit)
  if (!page) return renderNotFound(state, emit)

  // view
  var view = views[page.view] || views.default

  // title
  var title = getTitle(state, page)
  if (state.title !== title) emit(state.events.DOMTITLECHANGE, title)

  return html`
    <body class="vhmn100 x xdc fs1 ffsans lh1-5 bg-black tc-white">
      <div class="c12" style="min-height: 25vh">
        <div class="x c12 py1 psf t0 l0 r0 z3">
          <div class="c3 px1 copy-links" sm="c3">
            <a href="/">Jon-Kyle</a>
          </div>
          ${navigation()}
          <div class="psr copy-links" sm="c3">
            ${state.cache(Mailinglist, 'mailinglist').render()}
          </div>
        </div>
      </div>
      <div class="xx">
        ${view(state, emit)}
      </div>
      ${footer()}
      <div class="psa t0 r0 op0 ff-mono">
        mono load
      </div>
    </body>
  `

  function navigation () {
    var links = [{
      title: 'Index',
      url: '/'
    }, {
      title: 'About',
      url: '/about'
    }, {
      title: 'Projects',
      url: '/projects',
      active: false
    }]

    return links.map(link)
  }

  function link (props) {
    var active = page.path === '/'
      ? page.path === props.url
      : props.url === '/'
        ? false
        : page.path.indexOf(props.url) >= 0

    if (props.active === false) return

    return html`
      <div class="psr copy-links mr0-5">
        <a
          href="${props.url}"
          class="tdn tc-white ${active ? 'bb1-black' : ''}"
        >
          ${props.title}
        </a>,
      </div>
    `
  }

  function footer () {
    return html`
      <div class="x xw py1 lh1-5 bg-white tc-black vhmn75">
        <div class="c6" sm="c12">
          <div class="px1 c12">
            <a href="mailto:contact@jon-kyle.com" class="tc-black tdn">Email</a>,  <a href="https://github.com/jondashkyle/jon-kyle.com/tree/master/content${path.join(page.url, 'index.txt')}" target="_blank" class="tc-black tdn">Source</a>
          </div>
          <div class="px1 c12">
            Updated <span class="ffmono">${formatDate(manifest.updated)}</span>
          </div>
        </div>
        <div class="c6 px1 wwbw" sm="c12">
          <div class="ti2 ffmono">dat://7ab5ad001ae720e877fe038ac830e2ca2b87a6beac66d56aed0549619cb2ec6e</div>
        </div>
      </div>
    `
  }
}

function formatDate (str) {
  var date = new Date(str)

  var day = date.getDate()
  var month = date.getMonth()
  var year = date.getFullYear().toString().substring(2)

  return [year, pad(month+1), pad(day)].join('-') + ' @ ' + [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(':') + 'UTC'
}

function pad (n) {
  return ('0' + n).slice(-2)
}

function renderLoading (state, emit) {
  return html`
    <body class="bgc-black ff-sans">
      <img class="loading" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAEAAIdpAAQAAAABAAAATgAAAAAAAAABAAAAAQAAAAEAAAABAAGkNAACAAAAAQAAAAAAAAAA/+EJlmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpleGlmRVg9Imh0dHA6Ly9jaXBhLmpwL2V4aWYvMS4wLyIgeG1sbnM6YXV4PSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wL2F1eC8iIGV4aWZFWDpMZW5zTW9kZWw9IiIgYXV4OkxlbnM9IiIvPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7QAsUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICZElDQ19QUk9GSUxFAAEBAAACVGxjbXMEMAAAbW50clJHQiBYWVogB+IABQADABUAFQABYWNzcEFQUEwAAAAAAAAAAAAA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">
    </body>
  `
}

function renderNotFound (state, emit) {
  return html`
    <body>
      <div class="notfound p1">
        Page not found
      </div>
    </body>
  `
}

function getTitle (state, page) {
  var siteTitle = state.content['/'].title
  var pageTitle = page.title
  
  return siteTitle !== pageTitle
    ? siteTitle + ' | ' + pageTitle
    : siteTitle
}
