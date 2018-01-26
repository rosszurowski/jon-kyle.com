var ov = require('object-values')
var html = require('choo/html')
var format = require('../components/format')

module.exports = log

function log (entries, activeUrl) {
  return html`
    <ul class="list-horiz lh1-5">
      ${entries.map(logItem)}
    </ul>
  `

  function logItem (props, i) {
    var active = activeUrl === props.url
    var text = props.text.slice(0).split('\n\n').slice(0, 2).join('\n\n')
    return html`
      <li>
        <a href="${props.url}" class="db tdn py1 oh" style="height: 10.25rem;">
          <div class="x">
            <div class="c3 px1" sm="c6">
              <div>
                ${active ? html`<div class="px1 psa t0" style="left: -2rem; width: 2rem">→</div>` : ''}
                ${props.title}
              </div>
              <div class="ffmono">${props.date}</div>
            </div>
            <div class="c9 px1 excerpt">
              <div class="copy">
                ${format(text)}
              </div>
            </div>
          </div>
        </a>
      </li>
    `
  }
}

