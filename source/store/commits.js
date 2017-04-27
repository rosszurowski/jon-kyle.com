var xhr = require('xhr')
var endpoint = 'https://api.github.com/repos/jondashkyle/index/commits?sha=gh-pages'

module.exports = commits

function commits (state, emitter) {
  state.commits = [ ]

  // init
  xhr(endpoint, function (err, data, body) {
    if (!err && body) {
      var response = JSON.parse(body)
      var result = response.map(function (entry) {
        return {
          date: entry.commit.committer.date,
          message: entry.commit.message,
          url: entry.html_url
        }
      })
      state.commits = result
      emitter.emit('render')
    }
  })
}
