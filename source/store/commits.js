var xhr = require('xhr')
var endpoint = 'https://api.github.com/repos/jondashkyle/index/commits?sha=gh-pages'

module.exports = commits

function commits (state, emitter) {
  state.commits = [ ]

  // init
  xhr(endpoint, function (err, data, body) {
    if (!err && body) {
      var response = JSON.parse(body)
        .map(function (commit) {
          return {
            date: commit.commiter.date,
            message: commit.commit.message,
            url: commit.html_url
          }
        })
      console.log(response)
    }
  })
}
