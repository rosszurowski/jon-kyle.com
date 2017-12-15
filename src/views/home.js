var html = require('choo/html')
var md = require('../components/format')
var ov = require('object-values')
var wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="pt2 pb4 px3 fs1 lh1-5 copy">
      ${md(state.page.text)}
      ${md(state.page.ongoing)}
      ${log()}
      ${md(state.page.collaborations)}
      ${md(state.page.misc)}
      ${md(state.page.colophon)}
    </div>
  `

  function log () {
    var entries = ov(state.content['/entries'].pages)
      .map(function (page) {
        return state.content[page.url]
      })
      .filter(function (page) {
        return page
      })
      .reverse()
      .map(logItem)
    return [
      html`<h2>Log</h2>`,
      html`<ul class="list-horiz">${entries}</ul>`
    ]
  }

  function logItem (props) {
    return html`
      <li>
        <a href="${props.url}" class="x xjb c12">
          <div>
            ${props.title}
          </div>
          <div class="ff-mono tc-grey">${props.date}</div>
        </a>
      </li>
    `
  }
}

