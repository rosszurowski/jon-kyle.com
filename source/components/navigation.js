var Component = require('nanocomponent')
var html = require('choo/html')
var xtend = require('xtend')

var Mailinglist = require('./mailinglist')

module.exports = class Navigation extends Component {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit

    this.local = {
      scrollY: 0,
      isTop: true,
      active: true,
      links: [{
        title: 'About',
        url: '/about'
      }, {
        title: 'Log',
        url: '/'
      }, {
        title: 'Projects',
        url: '/projects'
      }, {
        title: 'Hangs',
        url: '/hangs'
      }, {
        title: 'Jpgs',
        url: '/images',
        active: false
      }, {
        title: 'Projects',
        url: '/projects',
        active: false
      }]
    }

    this.tick

    this.handleEnter = this.handleEnter.bind(this)
    this.createLink = this.createLink.bind(this)
    this.frame = this.frame.bind(this)
  }

  load (element) {
    this.tick = this.frame()
  }

  unload (element) {
    cancelAnimationFrame(this.tick)
  }

  frame (event) {
    if (this.local.scrollY !== window.scrollY) {
      if (this.local.scrollY > window.scrollY) {
        if (!this.local.active) {
          this.element.classList.add('nav-active')
          this.local.active = true

          if (window.scrollY < 10) {
            this.element.classList.add('nav-top')
            this.local.isTop = true
          }
        }
      } else {
        if (this.local.active) {
          this.element.classList.remove('nav-active')
          this.local.active = false
        }
      }

     if (window.scrollY >= 10 && this.local.isTop) {
        this.element.classList.remove('nav-top')
        this.local.isTop = false
      }

      this.local.scrollY = window.scrollY
    }

    this.tick = requestAnimationFrame(this.frame)
  }

  handleEnter (event) {
    this.local.scrollY = window.scrollY
    this.local.active = true
    this.rerender()
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div
        class="
          c12 py1 psf t0 l0 r0 z4 bg-black navigation
          ${this.local.active ? 'nav-active' : ''}
          ${this.local.isTop ? 'nav-top' : ''}
        "
        sm="psa"
      >
        <div class="x max-width mxa">
          <div class="nav-line" onmouseenter=${this.handleEnter}></div>
          <div class="c3 px1 copy-links" sm="xx">
            <a href="/" class="pea">Jon-Kyle</a>
          </div>
          <div class="x px1">
            ${this.createLinks()}
            <div class="psr copy-links pea">
              ${this.state.cache(Mailinglist, 'mailinglist').render()}
            </div>
          </div>
        </div>
      </div>
    `
  }

  createLinks () {
    return this.local.links
      .filter(link => link.active !== false)
      .map(this.createLink)
  }

  createLink (props) {
    var active = props.url === '/'
      ? this.state.href === '' || this.state.href === '/' || this.state.href.indexOf('/entries') === 0
      : this.state.href.indexOf(props.url) === 0

    return html`
      <div class="psr copy-links mr0-5">
        <a
          href="${props.url}"
          class="pea tdn tc-white nav-link ${active ? 'nav-link-active' : ''}"
        >
          ${props.title}
        </a>,
      </div>
    `
  }

  update (props) {
    return props.href !== this.local.href
  }
}
