var h = require('bel')
var x = require('xtend')
var ov = require('object-values')
var ok = require('object-keys')
var nc = require('nanocomponent')

var Entry = require('../components/entry')
var EntriesHeader = require('../components/header-entries')
var sort = require('../methods/sort')
var md = require('../methods/md')

var inView = [ ]

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
  var content = ov(state.content)

  var entries = content
    .filter(entry => filter !== undefined ? true : !entry.filter)
    .filter(entry => !entry.hidden && !entry.draft)
    .filter(entry => filterTag(entry, filter))
    .sort((a, b) => sortEntries(a, b, state.options.entriesSort))

  if (
    state.options.entryStart
  ) {
    var entry = content.find(e => e.path === state.options.entryStart)
    var position = entries.indexOf(entry)
    entries.splice(position, 1)
    entries.splice(0, 0, entry)
  }

  var elEntries = entries.map(entry => Entry({
    entry: entry,
    active: isEntryActive(entry.path),
    handleClick: handleEntryClick,
    handleContentClick: handleEntryContentClick,
    getClosePath: getClosePath,
    enter: entryEnter,
    exit: entryExit
  })())
   
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
    inView = [ ]
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

  function entryEnter (ev, entry) {
    if (inView.indexOf(entry) < 0 && isEntryActive(entry)) {
      inView.push(entry) 
      send('location:set', '/' + inView[inView.length-1])
    }
  }

  function entryExit (ev, entry) {
    if (inView.indexOf(entry) >= 0) {
      inView.splice(inView.indexOf(entry), 1) 
    }
  }

  function handleEntryClick (ev, entry) {
    var show = () => {
      send('entryActive', {
        entryClicked: true,
        entryActive: entry
      })
    }

    var hide = () => {
      inView.splice(inView.indexOf(entry), 1) 
      send('entryInactive', entry) 
    }

    return isEntryActive(entry) 
      ? hide()
      : show() 
  }

  function handleEntryContentClick (ev, entry) {
    var el = ev.target
    var video = el.getAttribute('data-video')
    return video
      ? el.parentNode.appendChild(h`
        <video
          src="${md.video(video, entry.path)}"
          class="psa t0 l0 h100 w00"
          autoplay
        ></video>
      `)
      : ''
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

  function isEntryActive (entry) {
    return state.options.entriesActive[entry]
  }

  return h`
    <div class="p0-5" sm="p0">
      ${entriesHeader}
      ${elEntries}
    </div>
  `
}

module.exports = View
