var xtend = require('xtend')

var api = require('../lib/api')

module.exports = plugin

// output

function plugin (state, emitter) {
  state.ui = {
    listSelected: '',
    videoActive: '',
    messageVisible: false,
    logPaginationAmount: 3,
    logPaginationPrev: 0,
    logPaginationNext: 0
  }

  state.ui.hang = {
    source: 'https:///live.jon-kyle.com/live/hello/index.m3u8',
    messageActive: false,
    loaded: false,
    messages: { },
    message: { },
    live: false
  }

  state.events.UI = 'ui'
  state.events.UI_HANG_DRAFT_MESSAGE = 'UI_HANG_DRAFT_MESSAGE'
  state.events.UI_HANG_POST_MESSAGE = 'UI_HANG_POST_MESSAGE'

  emitter.on(state.events.DOMCONTENTLOADED, handleHangLoad)

  emitter.on(state.events.UI, function (data) {
    data = data || { }
    var shouldRender = data.render !== false
    state.ui = xtend(state.ui, data)
    if (shouldRender) emitter.emit(state.events.RENDER)
  })

  emitter.on(state.events.UI_HANG_DRAFT_MESSAGE, function (data) {
    state.ui.hang.message = xtend(state.ui.hang.message, data)
    emitter.emit(state.events.RENDER)
  })

  emitter.on(state.events.UI_HANG_POST_MESSAGE, function (data) {
    if (!state.ui.hang.message) return
    fetch(api.href + '/v1/livestream/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(state.ui.hang.message)
    })
    .then(function (response) {
      // reset message
      state.ui.hang.message = { }
      emitter.emit(state.events.RENDER)
    })
    .catch(function (err) {
      alert('Can not submit, sorry!')  
    })
  })

  function handleHangLoad (data) {
    var wasLive = state.ui.hang.live

    // skip if loaded
    if (state.ui.hang.loaded) return 

    // grab the starting data
    fetch(api.href + '/v1/livestream')
      .then(async function (response) {
        var data = await response.json()
        state.ui.hang = xtend(state.ui.hang, data)
        emitter.emit(state.events.RENDER)
      })
      .catch(function (err) {

      })

    // stream updates
    var eventSource = new EventSource(api.href + '/v1/livestream/sse', { withCredentials: false })
    eventSource.addEventListener('admin', handleAdmin, false)
    eventSource.addEventListener('error', handleError, false)
    window.addEventListener('beforeunload', () => eventSource.close())

    // eventSource.addEventListener('message', handleMessage, false)

    // mark as loaded
    state.ui.hang.loaded = true
    if (!wasLive !== state.ui.hang.live) {
      emitter.emit(state.events.RENDER)
    }

    function handleError (event) {
      if (event.target.readyState === window.EventSource.CLOSED) {
        eventSource.close()
        // emitter.emit('sse:closed')
      } else if (event.target.readyState === window.EventSource.CONNECTING) {
        // emitter.emit('sse:reconnect')
      } else {
        // emitter.emit('sse:error', event)
      }
    }
  }

  function handleHangPostMessage (data) {
    var data = JSON.parse(event.data)
    var shouldRender = false
  }

  function handleAdmin (event) {
    var data = JSON.parse(event.data)
    var shouldRender = false

    // live
    if (typeof data.live !== 'undefined') {
      state.ui.hang.live = data.live
      shouldRender = true
    }

    if (typeof data.note !== 'undefined') {
      state.ui.hang.note = data.note
      shouldRender = true
    }

    // render
    if (shouldRender) emitter.emit(state.events.RENDER)
  }

  function handleMessage (event) {
    // console.log(event)
  }

}
