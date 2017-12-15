var locksley = require('locksley')
var choo = require('choo')

require('./src/design')

var content = locksley.readSiteSync('./content', {
  parent: '/content'
})

var app = choo()

app.use(require('./src/plugins/content')(content))
app.use(require('./src/plugins/scroll'))

if (module.parent) module.exports = app
else app.mount('body')
