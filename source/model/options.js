const x = require('xtend')
const xhr = require('xhr')

module.exports = {
  state: {
    options: {
      filterActive: '',
      entryActive: '',
      entriesActive: { },
      justSorted: false,
      entriesSort: {
        key: 'date',
        flip: false
      }
    }
  },
  reducers: {
    entryInactive: function (state, data) {
      var entriesActive = x({ }, state.options.entriesActive)
      delete entriesActive[data]
      return {
        options: x(state.options, {
          justSorted: false,
          entryActive: '',
          entriesActive: entriesActive
        })
      }
    },
    entryActive: function (state, data) {
      return {
        options: x(state.options, {
          justSorted: false,
          entryActive: data,
          entriesActive: x(state.options.entriesActive, {
            [data]: true
          })
        })
      }
    },
    entriesSort: function (state, data) {
      return {
        options: x(state.options, {
          entryActive: '',
          justSorted: true,
          entriesActive: { },
          entriesSort: x(state.options.entriesSort, data)
        })
      }
    },
    options: function (state, data) {
      return { options: x(state.options, data) }
    }
  }
}
