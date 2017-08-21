var html = require('choo/html')
var md = require('../components/format')
var ov = require('object-values')
var wrapper = require('../containers/wrapper')

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
    return html`
      <div>
        <h2>Log</h2>
        <ul>
          ${ov(state.page.children.entries.children).reverse().map(logItem)}
        </ul>
      </div>
    `
  }

  function logItem (props) {
    return html`
      <li>
        <a href="${props.url}">${props.title}</a>
        <span class="ffmono tc-grey">${props.date}</span>
      </li>
    `
  }
}

