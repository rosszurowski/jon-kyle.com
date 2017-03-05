var loaded = false

function removeLoader () {
  if (!loaded) {
  var el = document.querySelector('[data-loader]')
    if (el) {
      loaded = true
      return el.parentNode.removeChild(el)
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = {
  removeLoader: removeLoader
}
