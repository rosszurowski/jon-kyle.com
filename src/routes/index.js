var wrapper = require('../containers/main')

module.exports = {
  '/': { view: wrapper(require('./main')) },
  '/1499888145': {
    content: '1499888145.txt',
    view: wrapper(require('./entry'))
  }
}
