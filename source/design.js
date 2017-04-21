var html = require('bel')
var gr8 = require('gr8')
var recsst = require('recsst')

var gr8css = gr8({
  lineHeight: [1, 1.25, 1.5, 2],
  fontSize: [1, 1.5, 2, 3, 3.5],
  spacing: [0, 1, 2, 3, 4].map(size => {
    return { [size.toString().replace('.', '-')]: size / 2 }
  })
})

var colors = [
  { white: '#fff' },
  { black: '#000' },
  { grey: '#eee' }
]

var sansSystem = `
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  Roboto, 
  Helvetica,
  Arial,
  sans-serif,
  "Apple Color Emoji",  /* Emojis*/
  "Segoe UI Emoji", /* Emojis*/
  "Segoe UI Symbol"; /* Emojis*/
`

// fonts
gr8css.add({
  prop: 'font-family',
  vals: {
    sans: sansSystem
  },
  hyphenate: true
})

// font weights
gr8css.add({
  prop: 'font-weight',
  vals: [100, 200, 300, 400, 500, 600, 700],
})

// colors
gr8css.add({
  prop: 'background-color',
  prefix: 'bg',
  hyphenate: true,
  vals: colors
})

// opacity hovers
gr8css.add({
  prop: 'opacity',
  prefix: 'oph',
  suffix: ':hover',
  vals: [0, 25, 50, 75, 100]
})

// min heights
gr8css.add({
  prop: 'min-height',
  prefix: 'mhvh',
  unit: 'vh',
  vals: [0, 25, 33, 50, 75, 100]
})

// transforms
gr8css.add({
  prop: 'transform',
  prefix: 'tr',
  vals: [0, 90, 180, 270],
  transform: function (val) {
    return 'rotate(' + val + 'deg)'
  }
})

// viewport padding
gr8css.add({
  prop: 'padding',
  prefix: 'pvmin',
  unit: 'vmin',
  transform: function (val) {
    return val * 2.5
  },
  vals: [0, 1, 2, 3, 4]
})

var custom = `
  html { font-size: 1.5vw }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-moz-selection { background: rgba(0, 0, 0, 0.5) }
  ::selection { background: rgba(0, 0, 0, 0.5) }
`

var built = 
  recsst.toString() +
  gr8css.toString() +
  custom

process.stdout.write(built)
