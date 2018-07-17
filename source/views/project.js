var html = require('choo/html')
var dayjs = require('dayjs')
var format = require('../components/format')

var projectThumb = require('../components/project-thumb')

module.exports = view

function view (state, emit) {
  var props = state.page().v()
  var files = state.page().files().sortBy('name', 'asc').toArray()
  var href = state.page().v('href')

  return html`
    <div class="fs1 lh1-5 w100">
      <div class="x xw w100">
        <div class="c3 p1 psr" sm="c12">
          <div>${props.title}</div>
          <div class="ffmono dn">
            ${dayjs('20' + props.date).format('MMM.D,YYYY')}
          </div>
        </div>
        <div class="p1 c9">
          <div class="copy">
            ${format(state.page().v('text'))}
          </div>
        </div>
      </div>
      <div class="p1 co3 c9" sm="c12 co0">
        <div class="bt1-white"></div>
      </div>
      <div class="x xw w100">
        <div class="c3 px1 psr" sm="c12">
          <div>Hyperlink(s)</div>
        </div>
        <div class="px1 c9 copy">
          ${href
            ? typeof href === 'object'
              ? html`<ol>${href.map(props => html`<li>${createLink(props)}</li>`)}</ol>`
              : createLink(href)
            : '—'
          }
        </div>
        <div class="c3 px1 psr" sm="c12">
          <div>Collaborator(s)</div>
        </div>
        <div class="px1 c9 copy">
          ${format(state.page().v('collaborator') || '—')}
        </div>
        <div class="c3 px1 psr" sm="c12">
          <div>Client(s)</div>
        </div>
        <div class="px1 c9 copy">
          ${format(state.page().v('client') || '—')}
        </div>
      </div>
      <div class="mx1 bt1-white mt1"></div>
      <div class="x xw p0-5 w100">
        ${files.map(createFile)}
      </div>
    </div>
  `
}

function createFile (props) {
  switch (props.type) {
    case 'image': return createImage(props)
    default: return createThumbnail(props)
  }
}

function createThumbnail (props) {
  return html`
    <div class="p0-5 c4">
      <div class="img-border psr" style="padding-bottom: 100%">
        <a href="${getHref()}" target="_blank" class="tc-white tdn psa t0 l0 r0 b0 x xjc xac tac">
          ${props.filename}
        </a>
      </div>
    </div>
  `

  function getHref () {
    try  {
      return [
        window.location.protocol,
        '//',
        window.location.host,
        props.path
      ].join('')
    } catch (err) {
      return '#'
    }
  }
}

function createImage (props) {
  return html`
    <div class="p0-5 c4">
      ${projectThumb(props)}
    </div>
  `
}


function createLink (str) {
  return html`
    <a href="${str}" target="_blank" class="fc-black tdn a tc-white">${str}</a>
  `
}