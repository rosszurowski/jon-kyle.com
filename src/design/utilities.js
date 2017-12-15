var gr8 = require('gr8')
var options = require('./options')

var utils = [ ]

utils.push({
  prop: 'font-family',
  join: '-',
  vals: options.type
})

// backgrounds
utils.push({
  prop: { bgc: 'background-color' },
  join: '-',
  vals: options.colors
})

// colors
utils.push({
  prop: { fc: 'color' },
  join: '-',
  vals: options.colors
})

// rag widths
utils.push({
  prop: { wr: 'width' },
  unit: 'rem',
  vals: [0, 5, 10, 15, 20]
})

// viewport min heights
utils.push({
  prop: { vhmn: 'min-height' },
  unit: 'vh',
  vals: [0, 25, 33, 50, 66, 75]
})

module.exports = gr8({
  breakpoints: {
    lg: '1000px',
    md: '767px',
    sm: '500px'
  },
  lineHeight: [1, 1.5].map(size => {
    return { [size.toString().replace('.', '-')]: size * 1.1 }
  }),
  fontSize: [1],
  spacing: [0, 0.5, 1, 1.5, 2, 3, 4].map(size => {
    return { [size.toString().replace('.', '-')]: size / 2 }
  }),
  responsive: true,
  utils: utils
})