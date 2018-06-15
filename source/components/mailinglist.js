var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var xhr = require('xhr')

var styles = css('./mailinglist.css')

module.exports = class Subscribe extends Nanocomponent {
  constructor () {
    super()
    this.state = {
      success: false,
      loading: false,
      value: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  createElement (props, emit) {
    return html`
      <div class="${styles}">
        ${this.renderContent()}
      </div>
    `
  }

  renderContent () {
    this.form = this.renderForm()
    if (this.state.loading) return this.renderLoading()
    if (this.state.success) return this.renderSuccess()
    return this.form
  }

  renderLoading () {
    return html`
      <div class="subscribe-note">
        Sending…
      </div>
    `
  }

  renderSuccess () {
    return html`
      <div class="subscribe-note">
        Success!
      </div>
    `
  }

  renderForm () {
    return html`
      <form class="x" onsubmit=${this.handleSubmit}>
        <div class="psr">
          <input
            id="field_0"
            class="lh1-5 fs1 ffsans p0 m0 ${this.state.value ? 'psa w100' : ''}"
            name="embedded_form_subscription[field_0]"
            type="email"
            value="${this.state.value}"
            placeholder="Mailing list"
            oninput=${this.handleInput}
            required
          >
          <div class="pr0-5" style="color: rgba(255, 255, 255, 0)">${this.state.value}</div>
        </div>
        <button type="submit" class="lh1-5 ${this.state.value ? 'db' : 'dn'}">→</button>
        <input
          type="text"
          style="display: none"
          name="hpf54dd2b6-65b9-11e8-a3c9-06b79b628af2"
          tabindex="-1"
          aria-hidden="true"
          autocomplete="nope"
        >
      </form>
    `
  }

  handleInput (event) {
    this.state.value = event.target.value
    this.rerender()
  }

  handleSubmit (event) {
    var self = this

    this.state.loading = true
    event.preventDefault()
    self.rerender()

    xhr({
        method: 'post',
        body: new FormData(this.form),
        uri: 'https://emailoctopus.com/lists/f54dd2b6-65b9-11e8-a3c9-06b79b628af2/members/embedded/1.1/add'
    }, function (err, resp, body) {
      if (err || resp.statusCode !== 200) {
        self.state.error = true
      } else {
        self.state.success = true
      }
      self.state.loading = false
      self.rerender()
    })
  }

  update () {
    return false
  }
}
