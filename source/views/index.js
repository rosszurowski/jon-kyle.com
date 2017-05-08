module.exports = [{
  path: '/',
  view: require('./main')
}, {
  path: '/history',
  view: require('./history')
}, {
  path: '*',
  view: require('./entry')
}]