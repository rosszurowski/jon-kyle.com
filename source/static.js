var fs = require('fs')
var npath = require('path')
var createHTML = require('create-html')

var app = require('./')
var routes = require('./routes')
var config = require('../config')

var PUBLIC = config.public || 'public'

// create pages
Object.keys(routes).forEach(function (route) {
  if (routes[route].view) {
    var index = npath.join(__dirname, '../', PUBLIC, route, 'index.html')
    var output = createHTML({
      title: 'jon-kyle',
      script: '/bundle.js',
      css: '/bundle.css',
      head: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      body: app.toString(route, app.state)
    })

    fs.writeFileSync(index, output, { flag: 'w'})
    console.log(`built: ${route}`)
  } else {
    console.log(`error: ${route} does not have a view`)
  }
})
