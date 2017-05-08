var html = require('bel')
var md = require('marked')
var objectValues = require('object-values')
var api = require('../methods/api')

module.exports = Main

function Header (state, emit) {
  var content = state.content['site-meta'] || { }
  var image = api + 'about/me.jpg'

  return html`
    <div class="p1 x xw vhmn33">
      <div class="c1 p1" md="c2" sm="c4">
        <div
          class="bgsc bgrn bgpc"
          style="
            background-image: url(${image});
            padding-bottom: 100%;
          "
        ></div>
      </div>
      <div class="c4 co7" md="co3 c6" sm="co0 c12">
        <div class="p1">
          <div>
            <a
              href="mailto:${content.email}"
              class="tdn tc-black bb1h"
            >
              ${content.email}
            </a>
          </div>
          <div>
            <a
              href="http://twitter.com/${content.twitter}"
              class="tdn tc-black bb1h"
            >twitter</a>,
            <a
              href="https://www.are.na/jon-kyle-mohr"
              class="tdn tc-black bb1h"
            >are.na</a>
          </div>
        </div>
        <div class="p1">
          <a
            href="/history"
            class="tdn hcbb1 tc-black ${state.commits.length > 0 ? 'db' : 'dn'}"
          >
            <div>last updated</div>
            <div>
              <span class="hbb1">
                ${state.commits[0] ? state.commits[0].date : ''}
              </a>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
}

function Footer (state, emit) {
  var content = state.content['site-meta'] || { }

  if (content && content.footer) {
    var text = html`<div></div>`
    text.innerHTML = md.parse(content.footer)
    return html`
      <div class="p2 fs0-65 copy">
        ${text} 
      </div>
    `
  }
}

function Featured (state, emit) {
  var entries = objectValues(state.content)
    .filter(entry => !entry.hidden)
    .filter(entry => entry.rank > 3)
    .sort(sortEntriesByDate)
    .reverse()
    .map(function (entry) {
      return html`
        <div class="p1 wr15" md="c6" sm="c12">
          <a
            href="/${entry.id}"
            class="db tc-black tdn b1b p1"
          >
            <div>
              ${entry.title}
            </div>
            <div class="fs0-65">
              ${entry.subtitle}
            </div>
          </a>
        </div>
      `
    })

  return html`
    <div class="x xw p1">
      ${entries}
    </div>
  `
}

function List (state, emit) {
  var entries = objectValues(state.content)
    .filter(entry => !entry.hidden)
    .filter(function (entry) {
      return entry.rank
        ? entry.rank < 3
        : true
    })
    .sort(sortEntriesByDate)
    .map(entry => Entry(entry, emit))

  return html`<div class="p1">${entries}</div>`
}

function Entry (state, emit) {
  var isExternal = state.external && state.url
  var url = isExternal ? state.url : '/' + state.id

  var collaborator = () => html`<span class="op25">w/ ${state.collaborator}</span>`
  var client = () => html`<span class="op25">${state.client}</span>`
  var external = () => html`<span class="tr-45">→</span>`

  return html`
    <div>
      <a href=${url} class="x tc-black tdn hcbb1">
        <div class="c8 pl1 pr4" sm="c12 pr1">
          <div class="line-indent">
            ${[
              html`<span class="hbb1">${state.title}</span>`,
              isExternal ? external() : '',
              state.collaborator ? collaborator() : '',
              state.client ? client() : ''
            ]}
          </div>
        </div>
        <div class="c4 px1 op25" sm="dn">
          ${state.type}
        </div>
      </a>
    </div>
  `
}

function Main (state, emit) {
  return html`
    <div onload=${handleLoad}>
      ${Header(state, emit)}
      ${Featured(state, emit)}
      ${List(state, emit)}
      ${Footer(state, emit)}
    </div>
  `

  function onclick () {
    emit('increment', 1)
  }

  function handleLoad () {
    window.scrollTo(0, 0)
  }
}

function sortEntriesByDate (a, b) {
  a = a.date.replace(/\//g, ':')
  b = b.date.replace(/\//g, ':')
  return a > b ? -1 : a < b ? 1 : 0
}