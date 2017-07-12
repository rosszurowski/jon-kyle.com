var html = require('bel')

module.exports = Main

function Main (view) {
  return function (state, emit) {
    return html`
      <body class="fs1 ffsans lh1-5 bg-white tc-black">
        ${view(state, emit)}
        <div class="psa t0 l0 op0 ff-mono">
          mono load
        </div>
      </body>
    `
  }
}
