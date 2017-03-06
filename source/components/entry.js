var x = require('xtend')
var h = require('bel')
var nc = require('nanocomponent')
var md = require('../methods/md')

module.exports = Entry

function Entry (opts) {
  var o = opts || { }
  var entry = opts.entry

  var text = () => {
    var el = h`<div class="copy copy-indent ${entry.style}"></div>`
    el.innerHTML = md.parse(entry.text, entry.path)
    return el
  }

  var date = h`<div></div>`
  date.innerHTML = entry.date.replace(/\//g, '<div class="em"></div>')

  var tags = () => h`
    <ul>
      ${entry.tags.sort().map(tag => h`
        <li>
          <a
            href="/filter/${tag}"
            class="bb1h tdn tc-black"
           >
            ${tag}
           </a>
         </li>
      `)}  
    </ul>
  `

  var el = () => h`
    <div class="x xw c12 lh2">
      <a
        href="/${o.active ? o.getClosePath() : entry.path}"
        class="x xw c12 tc-black tdn ${o.active ? 'bm1ch' : 'bb1ch'}"
        onclick=${ev => o.handleClick(ev, entry.path)}
      >
        <div class="c2 p0-5 oh toe wsnw" sm="dn">
          ${entry.type}
        </div>
        <div class="c2 ff-mono p0-5 oh toe wsnw" sm="c3">
          ${date}
        </div>
        <div class="c5 p0-5 oh toe wsnw" sm="c8">
          <span class="${o.active ? 'bm1hc' : 'bb1hc'}">${entry.title}</span>
        </div>
        <div class="c2 p0-5 oh toe wsnw" sm="dn">
          ${entry.collaborator || entry.client}
        </div>
        <div class="c1 p0-5 tar">
          ${o.active ? '×' : '+'}
        </div>
      </a>
      <div class="c12 ${o.active ? 'x xw' : 'dn'}">
        <div class="p0-5 c2" sm="c3">
          <div class="${entry.url ? '' : 'dn'}">
            <a href="${entry.url}" class="bb1h tc-black tdn">visit</a>
            <div class="arrow arrow-top-right"></div>
          </div>
          <div>
            <a href="/${entry.path}" class="bb1h tc-black tdn">permalink</a>
          </span>
        </div>
        <div class="p0-5 c2 list" sm="c7">
          ${entry.tags ? tags() : h`<div></div>`}
        </div>
        <div
          class="c8 p0-5"
          sm="c12"
          onclick=${ev => o.handleContentClick(ev, entry)}
        >
          ${text()}
        </div>
      </div>
    </div>
  `

  return nc({
    render: el,
    onenter: ev => {
      return o.active
        ? o.enter(ev, entry.path)
        : ''
    },
    onexit: ev => {
      o.exit(ev, entry.path)
    }
  })
}