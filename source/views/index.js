const wrapper = require('../containers/wrapper')

function work (active) {
  return wrapper(require('./work'), { active: '/' })
}

function about (active) {
  return wrapper(require('./about'), { active: '/about' })
}

module.exports = [
  ['/404', wrapper(require('./404'))],
  ['/', work(),
    ['/:page', work()]
  ],
  ['/about', about()],
  ['/filter/:filter', work()]
]
