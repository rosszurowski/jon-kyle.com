const x = require('xtend')
const xhr = require('xhr')

module.exports = {
  state: {
    options: { }
  },
  reducers: {
    options: function (state, data) {
      return { options: x(state.options, data) }
    }
  }
}
