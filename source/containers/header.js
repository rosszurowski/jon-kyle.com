var h = require('bel')
var ov = require('object-values')
var x = require('xtend')

var md = require('../methods/md')

function Tags (o) {
  return h`
    <ul>
      ${ov(o.filters).map(tag => h`
        <li>
          <a
            href="/filter/${tag.filter}"
            class="bb1h tdn tc-black ${o.filter === tag.filter ? 'bb1' : ''}"
           >
            ${tag.text}
           </a>
        </li> 
      `)}
    </ul>
  `
}

function Pages (o) {
  return ov(o.pages).map(page => h`
    <div>
      <a
        href="${page.url}"
        class="bb1h tdn tc-black ${o.active === page.url ? 'bb1' : ''}"
       >
        ${page.text}
       </a>
    </div> 
  `)
}

function Header (o) {
  var note = h`<div class="copy"></div>`
  note.innerHTML = md.parse(o.note)

  return h`
    <div class="x xw p0-5 usn" sm="p1">
      <div class="p0-5 c4" sm="c3">
        <a href="/" class="tdn tc-black">${o.name}</a>
      </div>
      ${ov(o.pages).map(page => h`
        <div class="c2 p0-5">
          <div>
            <a
              href="${page.url}"
              class="bb1h tdn tc-black ${o.active === page.url ? 'bb1' : ''}"
             >
              ${page.text}
             </a>
          </div>
        </div> 
      `)} 
    </div> 
  `
}

module.exports = Header
