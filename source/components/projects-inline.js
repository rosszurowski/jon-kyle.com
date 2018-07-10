var Component = require('nanocomponent')
var shuffle = require('shuffle-array')
var html = require('choo/html')
var xtend = require('xtend')

var projectThumb = require('./project-thumb')
var libEntries = require('../lib/entries')

module.exports = class ProjectsInline extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state
    this.emit = emit
    this.local = {
      projects: [ ],
      thumbnails: { }
    }

    this.createProject = this.createProject.bind(this)
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    this.local.projects = shuffle(libEntries.getProjects(this.state))

    return html`
      <li class="bg-black">
        <div class="bt1-white mx1"></div>
        <div class="x xw xafe p0-5 max-width">
          <div class="x xjb p0-5 c12">
            <div>
              Select projects, randomized, for (and with) myself and sometimes others
            </div>
            <div>
              <a href="/projects" class="tdn tc-white">View All</a>
            </div>
          </div>
          ${this.local.projects.slice(0, 6).map(this.createProject)}
        </div>
      </li>
    `
  }

  createProject (props, i) {
    var cache = this.local.thumbnails[props.name]
    var file = props.thumbnail
      ? props.thumbnail
      : cache
      ? cache
      : shuffle(this.state.page(props).files().toArray())[0]

    this.local.thumbnails[props.name] = file

    return html`
      <div class="c2 p0-5" sm="${i > 2 ? 'dn' : ''} c4" md="c3 ${i > 4 ? 'dn' : ''}">
        <a href="${props.url}" class="db tdn tc-white project-thumb">
          ${projectThumb(this.local.thumbnails[props.name])}
          <div class="mt1">${props.title}</div>
        </a>
      </div>
    `
  }

  update (props) {
    return false
  }
}
