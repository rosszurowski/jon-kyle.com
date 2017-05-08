var html = require('bel')

module.exports = Main

function Main (view) {
  return function (state, emit) {
    return html`
      <body class="fs1 ff-sans lh1-5 bg-white tc-black">
        ${view(state, emit)}
        <div class="ff-mono"></div>
      </body>
    `
  }
}
