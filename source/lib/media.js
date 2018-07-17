module.exports = {
  parseImageFilename 
}

function parseImageFilename (str) {
  try {
    var filename = str.replace(/^.*[\\\/]/, '')
    var parts = filename
      .substring(0, filename.lastIndexOf('.'))
      .split('_')
    var opts = parts.map(str => str.substring(0, 1))
    return {
      sizes: { 500: filename },
      dimensions: { ratio: getRatio(parts, opts) },
      border: getBorder(parts, opts)
    }
  } catch (err) {
    return { }
  }
}

function getBorder (parts, opts) {
  var index = opts.indexOf('B')
  return index >= 0
}

function getRatio (parts, opts) {
  var index = opts.indexOf('R')
  return index >= 0
    ? parseFloat(parts[index].replace('R', ''))
    : 1
}
