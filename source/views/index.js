const wrapper = require('../containers/wrapper')

function work (active) {
  return wrapper(require('./work'), { active: (active || '/') })
}

function about (active) {
  return wrapper(require('./about'), { active: '/about' })
}

function images (active) {
  return wrapper(require('./images'), { active: '/images' })
}

module.exports = [
  ['/404', wrapper(require('./404'))],
  ['/', work(),
    ['/:page', work()]
  ],
  ['/about', about()],
  ['/images', images()],
  ['/filter/:filter', work('/filter/')]
]
