var Component = require('choo/component')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')
var Hls = require('hls.js')
var Plyr = require('plyr')

css('plyr/dist/plyr.css')

module.exports = class IntroVideo extends Component {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.local = { }
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div class="psa t0 l0 r0 b0 h100 w100" style="opacity: 0">
        <video class="psa t0 l0 r0 b0 h100 w100" poster="${props.poster}" playsinline controls>
          ${props.src ? html`<source src="${props.src}" type="video/mp4">` : ''}
        </video>
      </div>
    `
  }

  update (props) {
    if (props.stream && props.stream !== this.local.stream) {
      this.local = xtend(this.local, props)
      this.local.src = ''
      this.local.poster = ''
      this.player.source = {
        type: 'video',
        title: props.title,
        sources: [{
          src: '',
          type: 'video/mp4',
        }],
        poster: '' 
      }
      this.player.pause()
      this.loadLivestream()
      return false
    }

    if (props.src && props.src !== this.local.src) {
      this.local = xtend(this.local, props)
      // reset stream
      this.local.stream = ''
      if (this.hls) {
        this.hls.destroy()
        delete this.hls
      }
      // load
      this.player.source = {
        type: 'video',
        title: props.title,
        sources: [{
          src: props.src,
          type: 'video/mp4',
        }],
        poster: props.poster
      }

      this.player.pause()
      if (this.state.href !== '/hangs') this.player.play()
    }

    return false
  }

  load (element) {
    setTimeout(() => {
      element.style.opacity = 1
      this.player = new Plyr(this.element.querySelector('video'), {
        // captions: { active: false },
        controls: [
          'play-large', 'progress', 'current-time', 'fullscreen'
        ],
        loadSprite: false,
        iconUrl: '/assets/plyr.svg'
      })

      this.player.on('play', () => {
        // this.emit(this.state.events.UI_UPDATE, { introActive: true, introStarted: true })
      })

      this.player.on('pause', () => {
        // this.emit(this.state.events.UI_UPDATE, { introActive: false })
      })

      this.player.on('controlsshown', () => {
        // if (this.player.stopped) this.player.toggleControls(false)
      })

      // load stream
      if (this.local.stream) this.loadLivestream()
    }, 0)
  }

  handleLoad () {
    if (this.local.stream) {
      this.local.src = '' // clear the src
      this.loadLivestream()
    } else {
      this.local.stream = '' // clear the stream
      this.loadVideo() 
    }
  }

  loadVideo () {

  }

  loadLivestream () {
    var self = this
    if (Hls.isSupported() && this.local.stream) {
      var hls = this.hls ? this.hls : new Hls()
      if (!this.hls) this.hls = hls
      var video = self.element.querySelector('video')
      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        // console.log('video and hls.js are now bound together!')
        hls.loadSource(self.local.stream)
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          video.play()
          // console.log("manifest loaded, found " + data.levels.length + " quality level");
        })
      })
    }
  }

  unload (element) {
    delete this.hls
    delete this.player
  }
}
