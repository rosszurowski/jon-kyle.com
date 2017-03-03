
function getDate (date) {
  var parts = date.split('/')
  return ['20' + parts[2], parts[0], parts[1]]
}

function sortByDate(a, b) {
  return new Date(getDate(a)).getTime() - new Date(getDate(b)).getTime()
}

function sortByAlpha (a, b) {
  if (a > b) { return -1 }
  if (b > a) { return 1 }
  return 0
}

module.exports = {
  byDate: sortByDate,
  byAlpha: sortByAlpha
}
