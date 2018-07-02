var scrollTo = require('scroll-to')
var Tweezer = require('tweezer.js')
var ov = require('object-values')
var html = require('choo/html')
var dayjs = require('dayjs')
var { easeOutCubic } = require('ez.js')

var format = require('../components/format')
var libEntries = require('../lib/entries')

module.exports = log

function log (state, emit, opts) {
  var entries = libEntries.getAll(state)
  var selected = state.ui.listSelected

  var items = {
    entry: logEntry,
    update: logUpdate
  }

  return html`
    <ul class="list-horiz lh1-5 ${selected ? 'pen' : ''}">
      ${entries.map(props => items[props.type](props))}
    </ul>
  `

  function logUpdate (props, i) {
    return html`
      <li id="update-${props.date}" class="bt1-white">
        <div class="p1">${props.text}</a>
      </li>
    `
  }

  function logEntry (props, i) {
    var selected = state.ui.listSelected === props.url
    var text = props.text.slice(0).split('\n\n').slice(0, 8).join('\n\n')
    var thumb = props.thumb ? '/content' + props.url + '/' + props.thumb : false

    return html`
      <li id="${props.url}" class="entry ${selected ? 'selected' : ''}">
        <a
          href="${props.url}"
          class="db tdn py1 oh"
          onclick=${handleClick}
        >
          <div class="x pen psr">
            <div class="c3 px1" sm="c6">
              <div>
                ${props.title}
              </div>
              <div class="ffmono">
                ${dayjs('20' + props.date).format('MMM.D,YYYY')}
              </div>
            </div>
            <div class="c9 px1 excerpt">
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
        <div class="psa t0 r0 mr1">
          <img src="${thumb}" class="entry-thumb">
        </div>
      `
    }

    function handleClick (event) {
      var footer = document.querySelector('footer')
      var box = footer.getBoundingClientRect()

      event.preventDefault()

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
      var box = event.target.getBoundingClientRect()
      var offset = Math.ceil((window.innerHeight * 0.25) - box.top)
      // var duration = (Math.floor(window.scrollY - (offset)) * 2)
      var siblings = [...parent.children]
      var index = siblings.indexOf(event.target.parentNode)
      var nextBox = siblings[index + 1].getBoundingClientRect()
      var nextOffset = Math.ceil(window.innerHeight - nextBox.top) + 1

      // min + max offset
      var duration = 500
      // if (duration > 500) duration = 500
      // if (duration < 250) duration = 250

      // move that border and cover that up
      var screen = html`<div class="psa t0 l0 r0 vh100 vw100 bg-black bt1-white"></div>`
      parent.insertBefore(screen, event.target.parentNode)
      screen.style.top = window.scrollY + box.top + 'px'

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
            setTimeout(cleanup, 1)
            window.scrollTo(0, 0)
            emit('ui', { listSelected: '', render: false })
          }, duration + 1)
      }

      var transition = new Tweezer({
        start: 0,
        end: (box.top * -1) - 7.5,
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
          var childBox = el.getBoundingClientRect()
          // skip if not in viewport
          if (childBox.top > window.scrollY + window.innerHeight) return

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
}

