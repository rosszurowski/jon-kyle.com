var x = require('xtend')
var xhr = require('xhr')

module.exports = {
  state: {
    visitor: { }
  },
  reducers: {
    visitor: function (state, data) {
      return { visitor: x(state.visitor, data) }
    }
  }
}
