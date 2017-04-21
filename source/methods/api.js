var endpoint = process.env.NODE_ENV === "development" 
  ? 'http://localhost:3000/'
  : 'https://jondashkyle.github.io/index/'

module.exports = endpoint
