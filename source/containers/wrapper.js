const h = require('bel')
const x = require('xtend')

const View = (view, opts) => (state, prev, send) => {
  const o = x({
    bg: 'white',
    tc: 'black'
  }, state.options, opts)

  return h`
    <div class="
      ff-mono fs1 lh2
      tc-${o.tc} bg-${o.bg}
      vhmn100
    ">
      ${view(state, prev, send)}
    </div>
  `
}

module.exports = View
