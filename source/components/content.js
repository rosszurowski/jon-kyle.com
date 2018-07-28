var Nanocomponent = require('choo/component')
var mediumZoom = require('medium-zoom')
var MonoImage = require('monoimage')
var scrollTo = require('scroll-to')
var html = require('choo/html')
var dayjs = require('dayjs')
var path = require('path')

var format = require('../components/format')

module.exports = class Content extends Nanocomponent {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.props = { }
    this.text = ''

    this.handleAnchorScroll = this.handleAnchorScroll.bind(this)
  }

  unload (element) {

  }

  formatImages () {
    var element = this.element
    var url = this.props.url
    var auto = [...element.querySelectorAll('.imgs-auto p')]
      .forEach(function (container) {
        unwrap(container)
      })
    var images = [...element.querySelectorAll('.copy img')]
      .forEach(function (image) {
        var parent = image.parentNode
        var src = image.getAttribute('data-src')
        var source = isAbsolute(src) ? src : '/content' + url + '/' + src
        var ratio = getRatio(src)

        // skip if not ratio
        if (!ratio) {
          image.setAttribute('src', source)
          if (image.parentNode.nodeName !== 'A') {
            mediumZoom(image, {
              background: 'rgba(0, 0, 0, 1)',
              container: element
            })
          }
          return
        }

        // add mono image
        parent.insertBefore(new MonoImage().render({
          sizes: { 100: source },
          dimensions: { ratio: ratio },
        }, {
          onload: function (_img) {
            if (_img.parentNode.nodeName === 'A') return
            mediumZoom(_img, {
              background: 'rgba(0, 0, 0, 1)',
              container: element
            })
          }
        }), image)
        // remove old
        parent.removeChild(image)
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

  formatLinks () {
    var self = this
    var element = this.element
    var links = [...element.querySelectorAll('a')]
    links.forEach(function (link) {
      var href = link.getAttribute('href')
      // skip non-local links
      if (href.substring(0, 1) === '#') {
        link.addEventListener('click', self.handleAnchorScroll)
      } else if (href.substring(0, 1) !== '/') {
        link.setAttribute('target', '_blank')
      }
    })
  }

  load (element) {
    this.formatImages()
    this.formatVideos()
    this.formatLinks()

    if (window.location.hash) this.handleAnchorScroll()
  }

  afterupdate () {
    this.formatImages()
    this.formatVideos()
    this.formatLinks()
  }

  createElement (props) {
    var thumb = props.thumb ? '/content' + props.url + '/' + props.thumb : false
    this.props = props
    this.text = format(props.text)
    return html`
      <div class="x xw w100 fs1 lh1-5 psr">
        <div class="c3 p1 psr" sm="c12">
          <div>${props.title}</div>
          <div class="ffmono">
            ${dayjs('20' + props.date).format('MMM.D,YYYY')}
          </div>
        </div>
        <div class="c9 p1 psr z2" sm="c12">
          <div class="copy">
            ${this.text}
          </div>
        </div>
        ${thumb ? createThumb() : ''}
      </div>
    `

    function createThumb () {
      return html`
        <div class="psa t0 r0 p1">
          <img src="${thumb}" class="entry-thumb">
        </div>
      `
    }
  }

  update (props) {
    return (
      props.url !== this.props.url ||
      props.title !== this.props.title
    )
  }

  handleAnchorScroll (event) {
    var href = event
      ? event.target.getAttribute('href')
      : window.location.hash
    var el = this.element.querySelector(href)
    // skip if no element
    if (!el) return
    // scroll to if exists
    var boxY = el.getBoundingClientRect().y
    var offsetY = boxY + window.scrollY
    var startY = offsetY > window.scrollY
      ? offsetY - 200
      : offsetY + 200

    window.scrollTo(0, startY)
    scrollTo(0, offsetY, { duration: 250 })
    if (event) {
      event.preventDefault()
      if (history.pushState) history.pushState(null, null, href)
      else window.location.hash = href
    }
  }
}

function isAbsolute (str) {
  var r = new RegExp('^(?:[a-z]+:)?//', 'i')
  return r.test(str)
}

function unwrap(wrapper) {
  var docFrag = document.createDocumentFragment()
  while (wrapper.firstChild) {
    var child = wrapper.removeChild(wrapper.firstChild)
    if (child.nodeType === 1)  {
      var container = document.createElement('div')
      container.appendChild(child)
      docFrag.appendChild(container)
    }
  }
  wrapper.parentNode.replaceChild(docFrag, wrapper)
}

function getRatio (src) {
  try {
    return parseInt(src.split('_')[1].replace(/\.[^/.]+$/, ""))
  } catch (err) {
    return false
  }
}
