const x = require('xtend')
const xhr = require('xhr')

module.exports = {
  state: {
    options: {
      filterActive: '',
      entryActive: '',
      entriesActive: { } 
    }
  },
  reducers: {
    entryInactive: function (state, data) {
      var entriesActive = x({ }, state.options.entriesActive)
      delete entriesActive[data]
      return {
        options: x(state.options, {
          entryActive: '',
          entriesActive: entriesActive
        })
      }
    },
    entryActive: function (state, data) {
      return {
        options: x(state.options, {
          entryActive: data,
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
