var Component = require('choo/component')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')
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
          <source src="${props.src}" type="video/mp4">
        </video>
      </div>
    `
  }

  update (props) {
    if (props.src !== this.local.src) {
      this.local = xtend(this.local, props)
      this.player.source = {
        type: 'video',
        title: props.title,
        sources: [{
          src: props.src,
          type: 'video/mp4',
        }],
        poster: props.poster
      }
      this.player.play()
    }

    return false
  }

  load (element) {
    setTimeout(() => {
      element.style.opacity = 1
      this.player = new Plyr(element.querySelector('video'), {
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
    }, 400)
  }

  unload (element) {
    delete this.player
  }
}
