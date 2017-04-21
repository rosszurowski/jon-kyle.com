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
      <div class="p1" onload=${handleLoad}>
        <div class="x xjb vhmn33">
          <div class="p1">
            # ${entry.title}
          </div>
          <div class="p1 pt0-5 lh1">
            <a href="/" class="tdn tc-black">←</a>
          </div>
        </div>
        <div style="max-width: 38rem">
          ${content}
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