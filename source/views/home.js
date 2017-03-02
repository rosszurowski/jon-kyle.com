var h = require('bel')
var ov = require('object-values')
var ok = require('object-keys')
var md = require('../methods/md')

function About (o) {
  return h`
    <div class="x p0-5" sm="p2-5" style="min-height: 50vh">
      <div class="p0-5 c5" sm="c6">
        <a href="/" class="tdn tc-black">${o.name}</a>
      </div>
      <div class="p0-5 c5 copy atdn" sm="c6">
        <ul>  
          ${o.tags.sort().map(tag => h`
            <li>
              <a href="/tag/${tag}" class="tdn tc-black">${tag}</a>
            </li> 
          `)}
        </ul>
      </div>
    </div> 
  `
}

function View (state, prev, send) {
  var entries = ov(state.content)
    .filter(entry => !entry.hidden)
    .map(entry => {
      var active = isEntryActive(entry.path)

      var text = () => {
        var el = h`<div class="copy"></div>`
        el.innerHTML = md.parse(entry.text)
        return el
      }

      var date = h`<div></div>`
      date.innerHTML = entry.date.replace(/\//g, '<div class="em"></div>')

      return h`
        <div class="x xw lh2">
          <div
            class="c5"
            sm="c12"
          >
            <a
              href="/${active ? '' : entry.path}"
              class="x c12 tc-black tdn "
              onclick=${ev => handleEntryClick(ev, entry.path)}
            >
              <div class="c4 ff-mono p0-5" sm="c6">
                ${date}
              </div>
              <div class="c8" sm="c6">
                <div class="p0-5">
                  ${entry.title}
                </div>
              </div>
            </a>
            <div class="${active ? 'x' : 'dn'}">
              <div class="p0-5 c4">
                <div class="${entry.url ? '' : 'dn'}">
                  <a href="/${entry.url}" class="tc-black tdn">visit site</a>
                  <span class="ff-mono tr-45">→</span>
                </div>
                <div>
                  <a href="/${entry.path}" class="tc-black tdn">permalink</a>
                </span>
              </div>
              <div class="p0-5 c8 copy atdn">
                <ul>
                ${entry.tags.sort().map(tag => h`
                  <li><a href="/tag/${tag}" class="tdn tc-black">${tag}</a></li>
                `)}  
                </ul>
              </div>
            </div>
          </div>
          <div class="c7 p0-5" sm="c12" lg="pr4">
            ${active ? text() : ''}
          </div>
        </div>
      `
    })
    
  var about = state.content.about
    ? About(state.content.about)
    : ''

  function isEntryActive (entry) {
    return state.options.entriesActive[entry]
  }

  function handleEntryClick (ev, entry) {
    return isEntryActive(entry) 
      ? send('entryInactive', entry) 
      : send('entryActive', entry) 
  }

  state.location.params.page && ok(state.options.entriesActive).length <= 0
    ? send('entryActive', state.location.params.page)
    : ''

  return [
    about,
    h`
      <div class="p0-5" sm="p2-5">
        ${entries}
      </div>
    `
  ]
}

module.exports = View
