var x = require('xtend')
var ov = require('object-values')
var xhr = require('xhr')

var api = require('../methods/api')
var endpoint = api.endpoint()
var apiData = endpoint + 'data.json'

module.exports = {
  state: {
    endpoint: endpoint,
    content: { }
  },
  subscriptions: {
    load: function (send, done) {
      xhr(apiData, (err, data, body) => {
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
