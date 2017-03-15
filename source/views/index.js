var wrapper = require('../containers/wrapper-primary')

module.exports = [
  ['/404', wrapper(require('./404'))],
  ['/', wrapper(require('./home'))],
]
