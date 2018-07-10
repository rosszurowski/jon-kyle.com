var objectKeys = require('object-keys')
var html = require('choo/html')
var dayjs = require('dayjs')

var Video = require('../components/video')

module.exports = view

function view (state, emit) {
  var videoActive = state.ui.videoActive || '18-06-26'
  var videos = state.page().v('videos')

  return html`
    <div class="x xw w100 pt3-5 px0-5 pb0-5 max-width">
      <div class="c8 p0-5" sm="c12">
        <div
          class="w100 psr bg-white"
          style="padding-bottom: 56.25%"
        >
          ${state.cache(Video, 'video').render(videos[videoActive])}
        </div>
      </div>
      <div class="c4 p0-5" sm="c12">
        ${objectKeys(videos).map(createThumb)} 
      </div>
    </div>
  `

  function createThumb (key, i) {
    var props = videos[key]
    return html`
      <div
        class="x ${i === 0 ? 'bt1-white' : ''} bb1-white py0-5 curp"
        onclick=${event => selectVideo(key)}
      >
        <div class="py0-5 pr0-5" style="width: 6.25rem">
          <div
            class="bg-white bgsc"
            style="background-image: url(${props.poster}); padding-bottom: 56.25%"
          ></div>
        </div>
        <div class="xx py0-5 pl0-5">
          <div>${props.title}</div>
          <div class="ffmono">
            ${dayjs('20' + key).format('MMM.D,YYYY')}
          </div>
        </div>
      </div>
    `
  }

  function selectVideo (key) {
    window.scrollTo(0, 0)
    emit(state.events.UI, {
      videoActive: key
    })
  }
}
