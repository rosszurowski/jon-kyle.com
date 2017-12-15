var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var path = require('path')
var format = require('../components/format')

module.exports = class Content extends Nanocomponent {
  constructor () {
    super()
    this.props = { }
    this.text = ''
  }

  load (element) {
    var videos = [...element.querySelectorAll('video')]
      .forEach(function (video) {
        var el = video.parentNode
        var parent = el.parentNode
        var src = video.children[0].getAttribute('src')
        var ext = path.extname(src)
        var basename = path.basename(src, ext)
        var thumbnail = element.querySelector(`figure img[src*=${basename}]`)

        var container = html`
          <div
            class="embed-responsive embed-responsive-16by9 curp op0"
            onclick=${handleClick}
          >
            ${video}
          </div>
        `

        if (thumbnail) {
          thumbnail.parentNode.classList.add('psr')
          thumbnail.parentNode.appendChild(html`
            <div class="psa t0 l0 r0 b0">
              ${container}
            </div>
          `)
        } else {
          parent.insertBefore(container, el)
        }

        parent.removeChild(el)

        function handleClick () {
          if (!video.paused) {
            container.classList.add('op0')
            video.pause()
          } else {
            container.classList.remove('op0')
            video.play()
          }
        }
      })
  }

  unload (element) {

  }

  createElement (props) {
    this.props = props
    this.text = format(props.text)
    return html`
      <div class="pt2 pb4 px3 fs1 lh1-5 copy" sm="px1-5">
        <div style="min-height: 25vh">
          <h1>${props.title}</h1>
        </div>
        ${this.text}
        <h2><a href="/"><div class="back">←</div>Index</a></h2>
      </div>
    `
  }

  update (props) {
    return props.text !== this.props.text ||
      props.title !== this.props.title
  }
}
