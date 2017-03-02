const wrapper = require('../containers/wrapper')

module.exports = [
  ['/404', wrapper(require('./404'))],
  ['/', wrapper(require('./home')),
    ['/:page', wrapper(require('./home'))]
  ]
]
