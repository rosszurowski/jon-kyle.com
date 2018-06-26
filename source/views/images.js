var mediumZoom = require('medium-zoom')
var html = require('choo/html')

var Images = require('../components/images')
var layout = { }

module.exports = view

function view (state, emit) {
  var images = state.page().files().sortBy('name', 'desc').v()

  return state.cache(Images, 'image-log').render({
    images: images
  })
}
