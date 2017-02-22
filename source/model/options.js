const x = require('xtend')
const xhr = require('xhr')

module.exports = {
  state: {
    options: {
      title: 'jon-kyle',
      bg: 'white',
      tc: 'black'
    }
  },
  reducers: {
    options: function (state, data) {
      return { options: x(state.options, data) }
    }
  }
}
