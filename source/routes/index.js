var wrapper = require('../containers/main')

module.exports = {
  '/': {
    view: wrapper(require('./main'))
  }
}
