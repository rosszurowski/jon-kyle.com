var html = require('bel')
var markdown = require('../methods/markdown')
var Err = require('./error')

module.exports = Entry

function Entry (state, emit) {
  var entry = state.content[state.params.wildcard]

  if (entry && entry.text) {
    var content = html`<div class="p1 copy indent list"></div>`

    content.innerHTML = markdown.parse(
      entry.text,
      state.params.wildcard
    )

    return html`
      <div class="p1 vhmn100" onload=${handleLoad}>
        <div class="x xjb vhmn33">
          <div class="p1 h1">
            ${entry.title}
          </div>
          <div class="p1 pt0-5 lh1">
            <a href="/" class="tdn tc-black">←</a>
          </div>
        </div>

        <div class="c12 x xjc">
          <div style="width: 38rem; max-width: 100%;">
            ${content}
          </div>
        </div>
        
        <div class="p1 pt0-5 lh1">
          <a href="/" class="tdn tc-black">←</a>
        </div>
      </div>
    `
  } else {
    return Err
  }

  function handleLoad () {
    window.scrollTo(0, 0)
  }
}