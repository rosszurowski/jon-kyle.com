exports.typography = {
  mono: 'LarsTrial-Mono',
  sans: 'LarsTrial-Light',
  serif: 'Times'
}

exports.colors = [
  { white: '#fff' },
  { grey: '#999' },
  { black: '#000' }
]

exports.spacing = [
  { '0': 0 },
  { '0-5': 0.5 },
  { '1': 1 },
  { '1-5': 1.5 },
  { '2': 2 },
  { '2-5': 2.5 },
  { '3': 3 },
  { '3.5': 3.5 },
  { '4': 4 },
  { '4-5': 4.5 },
  { '5': 5 }
].map(function (space) {
  var key = Object.keys(space)
  var val = space[key]
  var result = { [key]: val * 1.5 } 
  return result
})

exports.fontSize = [
  { 1: 1 },
  { 2: 2 },
  { 3: 3 }
]

exports.lineHeight = [
  { 1: 1 },
  { 2: 1.5 }
]

exports.responsive = true
