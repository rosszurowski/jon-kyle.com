var scrollTo = require('scroll-to')
var ov = require('object-values')
var html = require('choo/html')
var format = require('../components/format')

module.exports = log

function log (state, emit) {
  return html`
    <ul class="list-horiz lh1-5 ${state.selected ? 'pen' : ''}">
      ${state.entries.map(logItem)}
    </ul>
  `

  function logItem (props, i) {
    var selected = state.selected === props.url
    var text = props.text.slice(0).split('\n\n').slice(0, 4).join('\n\n')
    return html`
      <li id="${props.url}" class="${selected ? 'selected' : ''}">
        <a
          href="${props.url}"
          class="db tdn py1 oh"
          style="height: 8.5rem;"
          onclick=${handleClick}
        >
          <div class="x pen">
            <div class="c3 px1" sm="c6">
              <div>
                ${props.title}
              </div>
              <div class="ffmono">${props.date}</div>
            </div>
            <div class="c9 px1 excerpt">
              <div class="copy">
                ${format(text)}
              </div>
            </div>
          </div>
        </a>
      </li>
    `

    function handleClick (event) {
      var box = event.target.getBoundingClientRect()
      var offset = window.scrollY - (window.innerHeight * 0.25) + box.top
      var duration = (Math.floor(Math.abs(window.scrollY - (offset))) * 2)

      // skip if no offset
      if (!offset) return

      if (duration > 500) duration = 500
      if (duration < 250) duration = 250

      var scroller = scrollTo(0, offset, {
        ease: 'outQuint',
        duration: duration
      })

      event.preventDefault()
      emit('ui', { listSelected: props.url })

      scroller.on('end', function () {
        setTimeout(function () {
          emit('ui', { listSelected: '' })
          emit('pushState', props.url)
        }, 1)
      })
    }
  }
}

