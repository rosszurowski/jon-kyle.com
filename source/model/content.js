var x = require('xtend')
var xhr = require('xhr')

var api = require('../methods/api')

var endpoint = api.endpoint() + 'data.json'

module.exports = {
  state: {
    endpoint: endpoint,
    content: { }
  },
  subscriptions: {
    load: function (send, done) {
      xhr(endpoint, (err, data, body) => {
        var resp = JSON.parse(body)
        send('content', resp, done)
      })
    }
  },
  reducers: {
    content: function (state, data) {
      return { content: x(state.content, data) }
    }
  }
}
