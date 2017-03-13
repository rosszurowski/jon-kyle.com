var x = require('xtend')
var h = require('bel')
var nc = require('nanocomponent')
var md = require('../methods/md')

module.exports = Entry

function Row (opts) {
  var o = opts || { }
  var entry = opts.entry

  var date = () => {
    var el = h`<div></div>`
    el.innerHTML = entry.date.replace(/\//g, '<div class="em"></div>')
    return el
  }

  var icon = () => entry.text
    ? o.active ? '×' : '+'
    : h`<div class="arrow arrow-top-right" style="margin-right: -3px"></div>`

  var collaborator = () => h`
    <span>
      <span class="em2"></span>
      ${entry.collaborator || entry.client}
    </span>
  `

  var structure = () => h`
    <div class="x xw c12">
      <div class="c2 ff-mono p0-5 oh toe wsnw" sm="c3">
        ${entry.date ? date() : ''}
      </div>
      <div class="c2 p0-5 oh toe wsnw" sm="dn">
        ${entry.type}
      </div>
      <div class="c7 p0-5 oh toe wsnw" sm="c8">
        <span class="${o.active ? 'bm1hc' : 'bb1hc'}">${entry.title}</span>${(entry.collaborator || entry.client) ? collaborator() : ''}
      </div>
      <div class="c1 p0-5 tar">
        ${icon()}
      </div>
    </div>
  `

  var internal = () => h`
    <a
      href="/${o.active ? o.getClosePath() : entry.path}"
      class="db c12 tc-black tdn ${o.active ? 'bm1ch' : 'bb1ch'}"
      onclick=${ev => o.handleClick(ev, entry.path)}
    >
      ${structure()}
    </a>
  `

  var external = () => h`
    <a
      href="${entry.url}"
      class="db c12 tc-black tdn bb1ch"
    >
      ${structure()}
    </a>
  `

  return entry.text
    ? internal()
    : external()
}

function Body (opts) {
  var o = opts || { }
  var entry = opts.entry

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

  var text = () => {
    var el = h`<div class="copy copy-indent ${entry.style}"></div>`
    el.innerHTML = md.parse(entry.text, entry.path)
    return el
  }

  return h`
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
  `
}

function Entry (opts) {
  var o = opts || { }
  var entry = opts.entry

  var el = () => h`
    <div class="x xw c12 lh2">
      ${Row(o)}
      ${entry.text ? Body(o) : ''}
    </div>
  `

  // return nc({
  //   render: el,
  //   onupdate: (el, data) => {
  //     console.log('updating', el)
  //   }
    // onenter: ev => {
    //   return o.active
    //     ? o.enter(ev, entry.path)
    //     : ''
    // },
    // onexit: ev => {
    //   o.exit(ev, entry.path)
    // }
  // })
  
  return el
}