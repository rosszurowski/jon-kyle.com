module.exports = [{
  path: '/',
  view: require('./main')
}, {
  path: '*',
  view: require('./entry')
}]