var h = require('bel')
var ov = require('object-values')
var ok = require('object-keys')
var md = require('../methods/md')

function View (state, prev, send) {
  var filter = state.location.params.filter || state.options.filter

  var entries = ov(state.content)
    .filter(entry => !entry.hidden)
    .filter(entry => !entry.draft)
    .filter(entry => {
      var tag = entry.tags
        ? entry.tags.indexOf(filter) >= 0
        : false

      return filter
        ? tag || entry.type === filter
        : true
    })
    .map(entry => {
      var active = isEntryActive(entry.path)

      var text = () => {
        var el = h`<div class="copy ${entry.style}"></div>`
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

      return h`
        <div class="x xw c12 lh2">
          <a
            href="/${
              active
                ? state.options.filter
                  ? 'filter/' + state.options.filter
                  : ''
                : entry.path
            }"
            class="x xw c12 tc-black tdn ${active ? 'bm1ch' : 'bb1ch'}"
            onclick=${ev => handleEntryClick(ev, entry.path)}
          >
            <div class="c2 p0-5" sm="dn">
              ${entry.type}
            </div>
            <div class="c2 ff-mono p0-5" sm="c3">
              ${date}
            </div>
            <div class="c5 p0-5" sm="c5">
              <span class="${active ? 'bm1hc' : 'bb1hc'}">${entry.title}</span>
            </div>
            <div class="c2 p0-5" sm="dn">
              ${entry.collaborator}
            </div>
            <div class="c1 p0-5 tar">
              ${active ? '×' : '+'}
            </div>
          </a>
          <div class="c12 ${active ? 'x xw' : 'dn'}">
            <div class="p0-5 c2" sm="c6">
              <div class="${entry.url ? '' : 'dn'}">
                <a href="/${entry.url}" class="bb1h tc-black tdn">visit</a>
                <span class="ff-mono tr-45">→</span>
              </div>
              <div>
                <a href="/${entry.path}" class="bb1h tc-black tdn">permalink</a>
              </span>
            </div>
            <div class="p0-5 c2 list" sm="c6">
              ${entry.tags ? tags() : h`<div></div>`}
            </div>
            <div class="c8 p0-5" sm="c12">
              ${text()}
            </div>
          </div>
        </div>
      `
    })
    
  function isEntryActive (entry) {
    return state.options.entriesActive[entry]
  }

  function handleEntryClick (ev, entry) {
    return isEntryActive(entry) 
      ? send('entryInactive', entry) 
      : send('entryActive', entry) 
  }

  function handleTagClick (tag) {
    return send('options', { fitler: tag })
  }

  return h`
    <div class="p0-5" sm="p1">
      <div class="x c12">
        <div class="p0-5 c2" sm="dn">
          type
        </div>
        <div class="p0-5 c2" sm="c3">
          date <span class="ff-mono">↓</span>
        </div>
        <div class="p0-5 c6" sm="c9">
          title
        </div>
      </div>
      ${entries}
    </div>
  `
}

module.exports = View
