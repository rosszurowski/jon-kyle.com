var createHTML = require('create-html')
var mkdirp = require('mkdirp')
var xtend = require('xtend')
var npath = require('path')
var fs = require('fs')

var app = require('./src')
var routes = require('./src/routes')
var config = require('./config')

var PUBLIC = config.public || 'public'

// create pages
Object.keys(routes).forEach(function (route) {
  if (routeExists(route)) {
    var dir = npath.join(__dirname, PUBLIC, route)

    mkdirp(dir, function (err) {
      if (err) return console.warn(err)
      var state = xtend({ }, app.state)

      // if there is content for the route, load and write it
      if (routes[route].content) {
        var content = npath.join(__dirname, 'static', routes[route].content)
        try {
          state[route] = fs.readFileSync(content, 'utf8')
          fs.writeFileSync(npath.join(dir, 'content.txt'), state[route], { flag: 'w'})
        } catch (err) {
          console.warn(err)
        }
      }

      // stub out the html
      var output = createHTML({
        title: 'jon-kyle',
        script: '/bundle.js',
        css: '/bundle.css',
        head: '<meta name="viewport" content="width=device-width, initial-scale=1">',
        body: app.toString(route, state)
      })

      // write the index file
      fs.writeFileSync(npath.join(dir, 'index.html'), output, { flag: 'w'})

      console.log(`built: ${route}`)
    })
  } else {
    console.log(`error: ${route} does not have a view, or is dynamic`)
  }
})

function routeExists (route) {
  return route && 
    ! route.match(/:|\*/) && 
    routes[route].view
}
