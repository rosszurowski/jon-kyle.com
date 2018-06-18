var MonoImage = require('monoimage')
var mediumZoom = require('medium-zoom')
var Component = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

var styles = css('./images.css')

module.exports = class Images extends Component {
  constructor (name, state, emit) {
    super()

    this.state = state
    this.emit = emit

    this.local = {
      images: [ ],
      layout: { } 
    }

    this.createImage = this.createImage.bind(this)
  }

  load (element) {

  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div class="x xw xjc xafe px0-5 ${styles}">
        ${this.local.images.map(this.createImage)}
      </div>
    `
  }

  createImage (props) {
    var element = this.element
    var layout = this.local.layout[props.name] || this.generateLayout(props)
    return html`
      <div class="${layout} images">
        ${this.state.cache(MonoImage, 'image-' + props.name).render({
          sizes: { 100: props.path },
          dimensions: { ratio: 100 }
        }, {
          onload: function (_img) {
            mediumZoom(_img, {
              background: 'rgba(0, 0, 0, 1)',
              container: element
            })
          }
        })}
      </div>
    `
  }

  generateLayout (props) {
    var layout = [
      'c' + Math.floor((Math.random() * 4) + 2),
      'px0-5 py3-5'
    ].join(' ')
    // set
    this.local.layout[props.name] = layout
    // return
    return layout
  }

  update (props) {
    return false
  }
}