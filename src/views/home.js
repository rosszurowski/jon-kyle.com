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
      ${md(state.page.collaborations)}
      ${md(state.page.misc)}
      ${md(state.page.colophon)}
    </div>
  `

  function log () {
    return [
      html`<h2>Log</h2>`,
      html`<ul class="list-horiz">
        ${ov(state.page.children.entries.children).reverse().map(logItem)}
      </ul>`
    ]
  }

  function logItem (props) {
    return html`
      <li>
        <a href="${props.url}" class="x xjb c12">
          <div>
            ${props.title}
          </div>
          <div class="ffmono tc-grey">${props.date}</div>
        </a>
      </li>
    `
  }
}

