var html = require('choo/html')

module.exports = Main

function Main (view) {
  return function (state, emit) {
    return html`
      <body class="fs1 ff-sans p2 lh1-5 bgc-black fc-white" sm="p0">
        ${view(state, emit)}
        <div class="psa t0 l0 op0 ff-mono">
          mono load
        </div>
      </body>
    `
  }
}
