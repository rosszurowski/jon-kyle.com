var Tweezer = require('tweezer.js')
var ov = require('object-values')
var html = require('choo/html')
var dayjs = require('dayjs')

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
      var parent = event.target.parentNode.parentNode
      var box = event.target.getBoundingClientRect()
      var offset = Math.ceil((window.innerHeight * 0.25) - box.top)
      var duration = (Math.floor(window.scrollY - (offset)) * 2)
      var siblings = [...parent.children]
      var index = siblings.indexOf(event.target.parentNode)

      // min + max offset
      if (duration > 500) duration = 500
      if (duration < 250) duration = 250

      var screen = html`<div class="psa t0 l0 r0 vh100 vw100 bg-black bt1-white"></div>`
      parent.insertBefore(screen, event.target.parentNode)
      screen.style.top = window.scrollY + box.top + 'px'

      // transition our element
      if (offset) {
        var transition = new Tweezer({
          start: 0,
          end: offset,
          duration: duration
        })
        .on('tick', function (value) {
          event.target.style.transform = `translate3d(0, ${value}px, 0)`
        })
        .on('done', function () {
          setTimeout(() => {
            emit('pushState', props.url)
            window.scrollTo(0, 0)
            emit('ui', { listSelected: '', render: false })
          }, 0)
        })
        .begin()
      } else {
          setTimeout(() => {
            emit('pushState', props.url)
            window.scrollTo(0, 0)
            emit('ui', { listSelected: '', render: false })
          }, duration + 1)
      }

      var transition = new Tweezer({
        start: 0,
        end: (box.top * -1) - 7.5,
        duration: duration
      })
      .on('tick', function (value) {
        screen.style.transform = `translate3d(0, ${value}px, 0)`
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
            end: window.innerHeight,
            duration: duration
          })
          .on('tick', function (value) {
            el.style.transform = `translate3d(0, ${value}px, 0)`
          })
          .begin()
        })

      // var scroller = scrollTo(0, offset, {
      //   ease: 'outQuint',
      //   duration: duration
      // })

      event.preventDefault()
      event.target.parentNode.classList.add('selected')
      parent.classList.add('pen')
      // emit('ui', { listSelected: props.url })
    }
  }
}

