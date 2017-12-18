var html = require('choo/html')
var path = require('path')
var manifest = require('../../manifest')

module.exports = Main

function Main (view) {
  return function (state, emit) {
    return html`
      <main class="vhmn100 x xdc fs1 ffsans lh1-5 bg-black tc-white" sm="p0">
        <div class="x c12" style="min-height: 25vh">
          <div class="c2 p1" sm="c3">Jon-Kyle</div>
          ${navigation()}
        </div>
        <div class="co2 xx" sm="co0">
          <div class="px1"><hr></div>
          ${view(state, emit)}
        </div>
        <div class="px1"><hr></div>
        ${footer()}
        <div class="psa t0 r0 op0 ff-mono">
          mono load
        </div>
      </main>
    `

    function navigation () {
      var links = [{
        title: 'Index',
        url: '/'
      }, {
        title: 'Archive',
        url: '/entries'
      }, {
        title: 'About',
        url: '/about'
      }]

      return links.map(link)
    }

    function link (props) {
      var active = state.page.path === '/'
        ? state.page.path === props.url
        : props.url === '/'
          ? false
          : state.page.path.indexOf(props.url) >= 0

      return html`
        <div class="c2 p1 psr copy-links" sm="c3">
          ${active ? html`<span class="dib p1 psa t0" style="left: -2rem; width: 2rem">→</span>` : ''}
          <a
            href="${props.url}"
            class="tdn tc-white"
          >
            ${props.title}
          </a>
        </div>
      `
    }

    function footer () {
      return html`
        <div class="x xw p0-5">
          <div class="p0-5 copy-links c2" sm="c3">
            <a href="https://github.com/jondashkyle/jon-kyle.com/tree/master/content${path.join(state.page.path , state.page.view + '.txt')}">View source</a>
          </div>
          <div class="p0-5 copy-links c2" sm="c3">
            <a href="mailto:contact@jon-kyle.com">Email</a>
          </div>
          <div class="p0-5 copy-links c4" sm="c3">
            <a href="http://twitter.com/jondashkyle">Follow</a>
          </div>
          <div class="p0-5 copy-links c4 tar" sm="c12 tal">
            Last updated on <span class="ffmono">${formatDate(manifest.updated)}</span>
          </div>
          <div class="c12 p0-5 wwbw" sm="c12">
            <div class="ti2">dat://7ab5ad001ae720e877fe038ac830e2ca2b87a6beac66d56aed0549619cb2ec6e</div>
          </div>
        </div>
      `
    }
  }
}

function formatDate (str) {
  var date = new Date(str)

  var day = date.getDate()
  var month = date.getMonth()
  var year = date.getFullYear().toString().substring(2)

  return [year, month, day].join('-')
}