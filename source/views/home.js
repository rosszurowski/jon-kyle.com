var md = require('../components/format')
var ov = require('object-values')
var html = require('choo/html')

var log = require('../components/log')
var Content = require('../components/content')
var content = new Content()

module.exports = view

function view (state, emit) {
  return log(state, emit)
}
