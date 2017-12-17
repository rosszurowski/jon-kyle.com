var ov = require('object-values')
var html = require('choo/html')

module.exports = log

function log (entries, activeUrl) {
  return html`
    <ul class="list-horiz lh1-5">
      ${entries.map(logItem)}
    </ul>
  `

  function logItem (props, i) {
    var active = activeUrl === props.url
    return html`
      <li>
        <a href="${props.url}" class="db tdn py1">
          <div class="x" style="margin: 0 -0.825rem">
            <div class="px1 ffmono w20" sm="c3">${props.date}</div>
            <div class="psr px1 xx">
              ${active ? html`<div class="px1 psa t0" style="left: -2rem; width: 2rem">→</div>` : ''}
              ${props.title}
            </div>
            <div class="px1">
              ${props.tags ? props.tags.join(', ') : ''}
            </div>
          </div>
        </a>
      </li>
    `
  }
}

