var Nanocomponent = require('choo/component')
var mediumZoom = require('medium-zoom')
var html = require('choo/html')
var path = require('path')
var format = require('../components/format')

module.exports = class Content extends Nanocomponent {
  constructor () {
    super()
    this.props = { }
    this.text = ''
  }

  unload (element) {

  }

  formatImages () {
    var element = this.element
    var url = this.props.url
    var images = [...element.querySelectorAll('img')]
      .forEach(function (image) {
        var src = image.getAttribute('src')
        var ratio = image.getAttribute('alt')
        if (isAbsolute(src)) return
        image.setAttribute('src', '/content' + url + '/' + src)
        mediumZoom(image, {
          background: 'rgba(0, 0, 0, 1)',
          container: element
        })
      })
  }

  formatVideos () {
    var element = this.element
    var url = this.props.url
    var videos = [...element.querySelectorAll('video')]
      .forEach(function (video) {
        var el = video.parentNode
        var parent = el.parentNode
        var src = video.children[0].getAttribute('src')
        var ext = path.extname(src)
        var basename = path.basename(src, ext)
        var thumbnail = element.querySelector(`figure img[src*=${basename}]`)

        // set attribute for the source
        video.setAttribute('src', '/content' + url + '/' + src)

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

  load (element) {
    this.formatImages()
    this.formatVideos()
  }

  afterupdate () {
    this.formatImages()
    this.formatVideos()
  }

  createElement (props) {
    this.props = props
    this.text = format(props.text)
    return html`
      <div class="fs1 lh1-5">
        <div class="x xw" style="min-height: 25vh">
          <div class="c3 p1" sm="c12">
            <div>${props.title}</div>
            <div class="ffmono">${props.date}</div>
          </div>
          <div class="c9 p1" sm="c12">
            <div class="copy">
              ${this.text}
            </div>
          </div>
        </div>
      </div>
    `
  }

  update (props) {
    return (
      props.url !== this.props.url ||
      props.title !== this.props.title
    )
  }
}

function isAbsolute (str) {
  var r = new RegExp('^(?:[a-z]+:)?//', 'i')
  return r.test(str)
}
