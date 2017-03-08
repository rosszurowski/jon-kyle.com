const x = require('xtend')
const xhr = require('xhr')

module.exports = {
  state: {
    options: {
      filterActive: '',
      entryActive: '',
      entryStart: '',
      entriesActive: { },
      entryClicked: '',
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
          entryActive: data.entryActive,
          entryStart: data.entryStart || state.options.entryStart,
          entriesActive: x(state.options.entriesActive, {
            [data.entryActive]: true
          })
        })
      }
    },
    entriesSort: function (state, data) {
      return {
        options: x(state.options, {
          entryActive: '',
          entryStart: '',
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
