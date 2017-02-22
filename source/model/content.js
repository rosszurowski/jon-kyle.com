var x = require('xtend')
var xhr = require('xhr')

module.exports = {
  state: {
    content: { }
  },
  reducers: {
    content: function (state, data) {
      return { ontent: x(state.content, data) }
    }
  }
}
