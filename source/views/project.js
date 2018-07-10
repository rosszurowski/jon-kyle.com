var html = require('choo/html')
var dayjs = require('dayjs')
var format = require('../components/format')

var projectThumb = require('../components/project-thumb')

module.exports = view

function view (state, emit) {
  var props = state.page().v()
  var images = state.page().images().sortBy('name', 'asc').toArray()
  var href = state.page().v('href')

  return html`
    <div class="fs1 lh1-5 w100">
      <div class="x xw w100">
        <div class="c3 p1 psr" sm="c12">
          <div>${props.title}</div>
          <div class="ffmono">
            ${dayjs('20' + props.date).format('MMM.D,YYYY')}
          </div>
        </div>
        <div class="p1 c9">
          <div class="copy">
            ${format(state.page().v('text'))}
          </div>
        </div>
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
        ${images.map(createImage)}
      </div>
    </div>
  `
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