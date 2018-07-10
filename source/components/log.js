var scrollTo = require('scroll-to')
var Tweezer = require('tweezer.js')
var ov = require('object-values')
var html = require('choo/html')
var dayjs = require('dayjs')
var { easeOutCubic } = require('ez.js')

var format = require('../components/format')
var ProjectsInline = require('./projects-inline')
var libEntries = require('../lib/entries')

var LASTHREF = ''

module.exports = log

function log (state, emit, opts) {
  var entriesAmount = 0
  var entryLast = ''
  var entries = libEntries.getAll(state)
  var selected = state.ui.listSelected
  var isActive = state.page().v('url') === state.href

  var activeIndex = state.page().v('view') === 'entry'
    ? entries.map(props => props.url).indexOf(state.href) + 1
    : -1

  // reset pagination if new page
  if (LASTHREF !== state.href) {
    LASTHREF = state.href
    emit(state.events.UI, { logPaginationNext: 0, logPaginationPrev: 0 })
  }

  // remove the index
  // entries = entries.filter(props => props.url !== state.href)
  entriesAmount = entries.length
  entryLast = entries[entriesAmount - 1].url

  // jump to point if on entry
  if (activeIndex >= 0) {
    var amount = state.ui.logPaginationAmount
    var position = amount
    position += (state.ui.logPaginationPrev * amount)
    position += (state.ui.logPaginationNext * amount)
    activeIndex -= (state.ui.logPaginationPrev * amount)
    if (activeIndex < 0) activeIndex = 0
    if (activeIndex > entriesAmount) entriesAmount 
    entries = entries.slice(activeIndex, activeIndex + position)
  }

  // create primary list
  var elsEntries = entries.map(logEntry)

  // add projects
  if (activeIndex < 0) {
    elsEntries.splice(
      1, 0, logUpdates(state)
    )
    elsEntries.splice(
      5, 0, state.cache(ProjectsInline, 'projects-inline-' + state.page().v('view')).render()
    )
  }

  // wrap in container
  return html`
    <ul class="list-horiz lh1-5 psr z2">
      ${activeIndex > 1
        ? createPrevious({ handleClick: handleClickPrevious })
        : ''
      }
      ${elsEntries}
      ${activeIndex >= 0 && entries[entries.length - 1].url !== entryLast
        ? createMore({ handleClick: handleClickNext })
        : ''
      }
    </ul>
  `

  function logEntry (props, i) {
    var selected = state.ui.listSelected === props.url
    var active = props.url === state.href
    var text = props.text.slice(0).split('\n\n').slice(0, 8).join('\n\n')
    var thumb = props.thumb ? '/content' + props.url + '/' + props.thumb : false

    return html`
      <li id="${props.url}" class="entry ${active ? 'active' : ''} ${selected ? 'selected' : ''}">
        <a
          href="${props.url}"
          class="db tdn oh psr ${active ? 'pen' : ''}"
          onclick=${handleClick}
        >
          <div class="x xw pen max-width ${active ? 'op25' : ''}">
            <div class="c3 p1" sm="c12">
              <div class="list-title">${props.title}</div>
              <div class="ffmono">
                ${dayjs('20' + props.date).format('MMM.D,YYYY')}
              </div>
            </div>
            <div class="c9 p1 excerpt" sm="c12">
              <div class="copy">
                ${format(text)}
              </div>
            </div>
            ${thumb ? createThumb() : ''}
          </div>
        </a>
      </li>
    `

    function createThumb () {
      return html`
        <div class="psa t0 r0 mt1 mr1">
          <img src="${thumb}" class="entry-thumb">
        </div>
      `
    }

    function handleClick (event) {
      var footer = document.querySelector('footer')
      var box = footer.getBoundingClientRect()

      event.preventDefault()
      document.body.classList.add('oh')

      if (window.scrollY + window.innerHeight >= document.body.offsetHeight - box.height) {
        var offset = document.body.offsetHeight - box.height - window.innerHeight
        var scroller = scrollTo(0, offset, {
          duration: 250
        })
        scroller.on('end', () => scrollElement(event))
      } else {
        scrollElement(event)
      }
    }

    function scrollElement (event) {
      var animating = true
      var parent = event.target.parentNode.parentNode
      var parentBoxTop = parent.getBoundingClientRect().top
      var boxTop = event.target.getBoundingClientRect().top
      var offset = Math.ceil((window.innerHeight * 0.25) - boxTop)
      // var duration = (Math.floor(window.scrollY - (offset)) * 2)
      var siblings = [...parent.children]
      var index = siblings.indexOf(event.target.parentNode)
      var nextBoxTop = siblings[index + 1].getBoundingClientRect().top
      var nextOffset = Math.ceil(window.innerHeight - nextBoxTop) + 1

      // min + max offset
      var duration = 500
      // if (duration > 500) duration = 500
      // if (duration < 250) duration = 250

      // move that border and cover that up
      var screen = html`<div class="psa t0 l0 r0 vh100 mx1 bg-black bt1-white"></div>`
      parent.insertBefore(screen, event.target.parentNode)
      screen.style.top = (boxTop - parentBoxTop) + 'px'

      // transition our element
      if (offset) {
        var transition = new Tweezer({
          start: 0,
          end: offset,
          duration: duration,
          // easing: easeOutCubic
        })
        .on('tick', function (value) {
          event.target.style.transform = `translate3d(0, ${value}px, 0)`
        })
        .on('done', function () {
          setTimeout(() => {
            animating = false
            emit('pushState', props.url)
            document.body.classList.remove('oh')
            window.scrollTo(0, 0)
            setTimeout(cleanup, 1)
            emit('ui', { listSelected: '', render: false })
          }, 0)
        })
        .begin()
      } else {
          setTimeout(() => {
            animating = false
            emit('pushState', props.url)
            document.body.classList.remove('oh')
            setTimeout(cleanup, 1)
            window.scrollTo(0, 0)
            emit('ui', { listSelected: '', render: false })
          }, duration + 1)
      }

      var transition = new Tweezer({
        start: 0,
        end: (boxTop * -1) - 7.5,
        duration: duration,
        // easing: easeOutCubic
      })
      .on('tick', function (value) {
        if (screen) screen.style.transform = `translate3d(0, ${value}px, 0)`
      })
      .begin()

      // transition any later siblings off screen
      siblings
        .slice(index + 1, siblings.legnth)
        .forEach(function (el) {
          var childBoxTop = el.getBoundingClientRect().top
          // skip if not in viewport
          if (childBoxTop > window.scrollY + window.innerHeight) return

          var transition = new Tweezer({
            start: 0,
            end: nextOffset,
            duration: duration,
            // easing: easeOutCubic
          })
          .on('tick', function (value) {
            if (animating) el.style.transform = `translate3d(0, ${value}px, 0)`
          })
          .begin()
        })

      event.target.parentNode.classList.add('selected')
      parent.classList.add('pen')

      function cleanup () {
        try {
          parent.removeChild(screen)
          event.target.style.transform = ''
          siblings.forEach(function (el) {
            el.style.transform = ''
          })
        } catch (err) { }
      }
    }
  }

  function handleClickPrevious () {
    emit(state.events.UI, { logPaginationPrev: state.ui.logPaginationPrev += 1 })
  }

  function handleClickNext () {
    emit(state.events.UI, { logPaginationNext: state.ui.logPaginationNext += 1 })
  }
}

function createPrevious (props) {
  return html`
    <li class="bg-black" onclick=${props.handleClick}>
      <div class="mx1 bt1-white mb2px"></div>
      <div class="mx1 bt1-white mb2px"></div>
      <div class="mx1 bt1-white"></div>
      <div class="p1 tac curp">Load previous entries</div>
    </li>
  `
}

function createMore (props) {
  return html`
    <li class="bg-black" onclick=${props.handleClick}>
      <div class="pb2px">
        <div class="mx1 bt1-white"></div>
        <div class="p1 tac curp">Load next entries</div>
        <div class="mx1 bt1-white mb2px"></div>
        <div class="mx1 bt1-white"></div>
      </div>
    </li>
  `
}

function logUpdates (state) {
  var updates = libEntries.getUpdates(state)

  return html`
      <li id="update" class="bg-black">
        <div class="bt1-white mx1"></div>
        <div class="p1">
          <span class="mr1">Recent things, briefly</span>
          ${updates.map(function (props) {
            return html`<span class="inline-children anchors mr0-5"><div class="circle"></div><span class="ffmono">${dayjs('20' + props.date).format('MMM.D')}</span>, ${format(props.text)}</span>`
          })}
        </div>
      </li>
  `
}