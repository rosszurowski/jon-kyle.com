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
    this.format()
  }

  afterupdate () {
    this.format()
  }

  unload (element) {

  }

  format () {
    var element = this.element
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

  createElement (props) {
    this.props = props
    this.text = format(props.text)
    return html`
      <div class="fs1 lh1-5" sm="px1">
        <div class="x" style="min-height: 25vh">
          <div class="p1 ffmono w20" sm="c3">${props.date}</div>
          <div class="p1 xx">${props.title}</div>
          <div class="px1">
            ${props.tags ? props.tags.join(', ') : ''}
          </div>
        </div>
        <div class="p1 copy">
          ${this.text}
        </div>
      </div>
    `
  }

  update (props) {
    return props.text !== this.props.text ||
      props.title !== this.props.title
  }
}
