var objectValues = require('object-values')
var objectKeys = require('object-keys')
var raw = require('choo/html/raw')
var html = require('choo/html')
var dayjs = require('dayjs')

var Video = require('../components/video')
var tickMessageHide

module.exports = view

function view (state, emit) {
  var videos = state.page('/hangs').pages().v()
  var videosArr = state.page(videos).sortBy('date', 'desc').value()
  var videoActive = videos[state.href]
    ? videos[state.href]
    : state.ui.hang.live
      ? { stream: state.ui.hang.source, url: '/hangs' }
      : videosArr[0]

  if (state.ui.hang.live) {
    videosArr.unshift({
      title: 'Live Hang Session',
      live: true,
      url: '/hangs',
      poster: '/assets/live-icon.svg'
    })
  } else if (state.ui.hang.note) {
    videosArr.unshift({
      title: 'Upcoming Live Hang',
      note: state.ui.hang.note,
      url: '/hangs',
      poster: '/assets/live-icon.svg'
    })
  }

  return html`
    <div>
      <div class="psa t0 l0 r0 bg-white" style="top: 8.2rem; bottom: 0rem;">
        ${state.ui.hang.loaded
          ? state.cache(Video, 'video').render(videoActive)
          : ''
        }
      </div>
      <div class="psf l0 r0 bg-black z3" sm="c12" style="top: 3.2rem">
        <div class="bt1-white"></div>
        <div class="psr w100 py1 oxs x">
          <div style="width: calc(calc(100vw - 67rem) / 2)"></div>
          ${videosArr.map(createThumb)} 
        </div>
      </div>
      ${state.href === '/hangs' && state.ui.hang.live
        ? createMessage()
        : ''
      }
    </div>
  `

  function createMessage () {
    var text = state.ui.hang.message.text || ''
    return html`
      <div
        class="psa r0 m1 z4 w100 ${state.ui.messageVisible ? 'message-visible' : ''}"
        style="top: 8.2rem; max-width: 20rem"
        onmouseleave=${handleMessageLeave}
      >
        <div
          class="message-icon db psa"
          onmouseenter=${handleMessageEnter}
          onclick=${handleMessageEnter}
        ></div>
        <form
          class="db m0 w100 tc-black message-form"
          onsubmit=${handleMessageSubmit}
          onmouseenter=${handleMessageEnter}
        >
          <textarea
            class="db m0 ffsans fs1 lh1-5 psa t0 l0 r0 b0 w100 h100 message-input"
            oninput=${handleMessageInput}
            placeholder="Send message"
            onkeypress=${handleMessageKeypress}
          >${raw(text)}</textarea>
          <div class="message-fake px1 py0-5 pen" style="color: rgba(255,255, 255, 0)">
            ${raw(text.replace(/(?:\r\n|\r|\n)/g, '<br>') + '.')}
          </div>
          <button type="submit" class="message-button psa b0 r0">→</button>
        </form>
      </div>
    `
  }

  function createThumb (props, i) {
    var isActive = props.url === videoActive.url
    return html`
      <a
        href="${props.url}"
        class="
          ${i !== 0 ? 'bl1-white' : ''}
          curp tdn tc-white
        "
      >
        <div class="${isActive ? 'pen op25' : ''} x px1">
          <div class="" style="width: 6.25rem">
            <div
              class="bg-white bgsc"
              style="background-image: url(${props.poster}); padding-bottom: 56.25%"
            ></div>
          </div>
          <div class="xx pl1 wsnw">
            <div>${props.title}</div>
            <div class="ffmono">
              ${props.date ? dayjs('20' + props.date).format('MMM.D,YYYY') : ''}
              ${props.live ? html`<span>Streaming<span class="live-blink ${isActive ? '': 'blink'}"></span></span>` : ''}
              ${props.note ? html`<span>${props.note}</span>` : ''}
            </div>
          </div>
        </div>
      </a>
    `
  }

  function handleMessageEnter (event) {
    clearTimeout(tickMessageHide)
    document.querySelector('textarea').focus()
    emit(state.events.UI, {
      messageVisible: true
    })
  }

  function handleMessageLeave (event) {
    clearTimeout(tickMessageHide)
    tickMessageHide = setTimeout(function () { 
      if (!state.ui.messageVisible) return
      document.querySelector('textarea').blur()
      emit(state.events.UI, {
        messageVisible: false
      })
    }, 500)
  }

  function handleMessageKeypress (event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      emit(state.events.UI_HANG_POST_MESSAGE)
      event.preventDefault()
    }
  }

  function handleMessageSubmit (event) {
    event.preventDefault()
    emit(state.events.UI_HANG_POST_MESSAGE)
  }

  function handleMessageInput (event) {
    var text = event.target.value
    emit(state.events.UI_HANG_DRAFT_MESSAGE, {
      text: text
    })
  }

  function selectVideo (key) {
    window.scrollTo(0, 0)
    emit(state.events.UI, {
      videoActive: key
    })
  }
}
