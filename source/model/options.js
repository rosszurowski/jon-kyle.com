const x = require('xtend')
const xhr = require('xhr')

module.exports = {
  state: {
    options: {
      entriesActive: { } 
    }
  },
  reducers: {
    entryInactive: function (state, data) {
      var entriesActive = x({ }, state.options.entriesActive)
      delete entriesActive[data]
      return {
        options: x(state.options, {
          entriesActive: entriesActive
        })
      }
    },
    entryActive: function (state, data) {
      return {
        options: x(state.options, {
          entriesActive: x(state.options.entriesActive, {
            [data]: true
          })
        })
      }
    },
    options: function (state, data) {
      return { options: x(state.options, data) }
    }
  }
}
