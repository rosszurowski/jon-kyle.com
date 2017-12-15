var html = require('choo/html')
var Content = require('../components/content')
var wrapper = require('../components/wrapper')

var content = new Content()

module.exports = wrapper(view)

function view (state, emit) {
  return content.render({
    title: state.page.title,
    text: state.page.text
  })
}

