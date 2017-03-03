var h = require('bel')
var x = require('xtend')
var ov = require('object-values')
var ok = require('object-keys')
var md = require('../methods/md')

var sort = require('../methods/sort')

function EntriesHeader (opts) {
  var o = x({
    flip: false,
    key: '',
    entriesActive: 0, 
    handleClick: key => { },
    handleReset: () => { },
    handleShowAll: () => { }
  }, opts)

  var arrow = key => {
    return h`<span class="ff-mono ${o.key === key ? 'op100' : 'op0'}">${!o.flip ? '↓' : '↑'}</span>`
  }

  var expand = () => h`
    <div class="curp" onclick=${o.handleShowAll}>+</div>
  `

  var collapse = () => h`
    <div class="curp" onclick=${o.handleReset}>×</div>
  `

  return h`
    <div class="x c12 usn">
      <div class="p0-5 c2" sm="dn">
        <span
          class="curp"
          onclick=${() => o.handleClick('type')}
        >type ${arrow('type')}</span>
      </div>
      <div class="p0-5 c2" sm="c3">
        <span
          class="curp"
          onclick=${() => o.handleClick('date')}
        >date ${arrow('date')}</span>
      </div>
      <div class="p0-5 c7" sm="c9">
        <span
          class="curp"
          onclick=${() => o.handleClick('title')}
        >title ${arrow('title')}</span>
      </div>
      <div class="c1 tar p0-5">
        ${o.entriesActive > 0 ? collapse() : expand() } 
      </div>
    </div>
  `
}

function sortEntries (a, b, opts) {
  if (opts.key === 'title') {
    return opts.flip
      ? sort.byAlpha(a.title, b.title)
      : sort.byAlpha(b.title, a.title)
  } else if (opts.key === 'type') {
    return opts.flip
      ? sort.byAlpha(a.type, b.type)
      : sort.byAlpha(b.type, a.type)
  } else {
    return opts.flip
      ? sort.byDate(a.date, b.date)
      : sort.byDate(b.date, a.date)
  }
}

function filterTag (entry, filter) {
  var tag = entry.tags
    ? entry.tags.indexOf(filter) >= 0
    : false

  return filter
    ? tag || entry.type === filter
    : true
}

function View (state, prev, send) {
  var filter = state.location.params.filter || state.options.filter

  var entries = ov(state.content)
    .filter(entry => !entry.hidden)
    .filter(entry => !entry.draft)
    .filter(entry => filterTag(entry, filter))
    .sort((a, b) => sortEntries(a, b, state.options.entriesSort))
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
            href="/${active ? getClosePath() : entry.path}"
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

  var entriesHeader = EntriesHeader (x({
    entriesActive: ok(state.options.entriesActive).length,
    handleClick: handleSortClick,
    handleReset: handleEntriesReset,
    handleShowAll: handleEntriesShowAll
  }, state.options.entriesSort))

  function getClosePath () {
    return state.options.filter
      ? 'filter/' + state.options.filter
      : ''
  }

  function handleEntriesReset () {
    send('location:set', '/' + getClosePath())
    send('options', {
      entryActive: '',
      entriesActive: { }
    })
  }

  function handleEntriesShowAll () {
    var entries = { }
    ok(state.content).forEach(key => {
      entries[key] = true
    })
    send('options', { entriesActive: entries })
  }

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

  function handleSortClick (key) {
    return send('entriesSort', {
      key: key,
      flip: key === state.options.entriesSort.key
        ? !state.options.entriesSort.flip
        : state.options.entriesSort.flip
    })
  }

  return h`
    <div class="p0-5" sm="p1">
      ${entriesHeader}
      ${entries}
    </div>
  `
}

module.exports = View
