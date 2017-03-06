if (process.env.NODE_ENV === 'production') {
  function endpoint () {
    return 'https://jondashkyle.github.io/index/'
  }
} else {
  function endpoint () {
    return 'http://localhost:3000/'
  }
}

module.exports = {
  endpoint: endpoint
}
