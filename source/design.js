var html = require('bel')
var gr8 = require('gr8')
var recsst = require('recsst')
var lilcss = require('lilcss')

var gr8css = gr8({
  lineHeight: [1, 1.25, 1.5, 2],
  fontSize: [1, 1.5, 2, 3, 3.5],
  spacing: [0, 1, 2, 3, 4].map(size => {
    return { [size.toString().replace('.', '-')]: size / 2 }
  }),
  responsive: true
})

var type = {
  sans: '"Lars Sans", ' + sansSystem,
  mono: '"Lars Mono", menlo, monaco, monospace'
}

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
  vals: type,
  hyphenate: true
})

// font weights
gr8css.add({
  prop: 'font-weight',
  vals: [100, 200, 300, 400, 500, 600, 700],
})

// backgrounds
gr8css.add({
  prop: 'background-color',
  prefix: 'bg',
  hyphenate: true,
  vals: colors
})

// colors
gr8css.add({
  prop: 'color',
  prefix: 'tc',
  hyphenate: true,
  vals: colors
})

gr8css.add({
  prop: 'min-height',
  prefix: 'vhmn',
  unit: 'vh',
  vals: [0, 25, 33, 50, 66, 75]
})

var custom = `
  html { font-size: 22px }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-moz-selection { background: rgba(0, 0, 0, 0.5) }
  ::selection { background: rgba(0, 0, 0, 0.5) }
`

var typography = `
  .copy > * {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 16.6666667%;
  }

  @media (max-width: 767px) {
    .copy > * {
      margin-left: 0;
    }
  }

  .copy > *:first-child { margin-top: 0 }
  .copy > *:last-child { margin-bottom: 0 }

  .copy h1,
  .copy h2,
  .copy h3 {
    font-size: 1rem;
    font-weight: normal;
    margin-left: 0;
  }

  .copy h1:before { content: '# ' }
  .copy h2:before { content: '## ' }

  .copy a {
    color: inherit;
    text-decoration: none;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #000;
  }

  .hcbb1:hover .hbb1 {
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #000;
  }

  .indent {
    text-indent: -1rem;
    margin-left: 1rem;
  }

  .tr-45 {
    display: inline-block;
    vertical-align: bottom;
    transform: rotate(-45deg);
    transform-origin: 0 0;
    margin-right: 1rem;
  }

  .copy a[href*="//"] {
    display: inline-block;
    margin-right: 1rem;
  }

  .copy a[href*="//"]:after {
    content: '→';
    display: inline-block;
    vertical-align: bottom;
    margin-right: -1rem;
    transform: rotate(-45deg);
  }

  .image img,
  .image video {
    margin: 0;
  }

  video { z-index: 3 }
  .video { background: #000 }

  .video img { opacity: 0.5 }
  .video:hover img { opacity: 1 }
  
  .video:before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 0;
    width: 0;
    margin-top: -1.5rem;
    margin-left: -1.5rem;
    border-top: 1.5rem solid transparent;
    border-bottom: 1.5rem solid transparent;
    border-left: 2.5rem solid #fff;
    z-index: 2;
  }

  .video:hover:before { display: none }

  figure {
    margin: 0;
    padding: 0;
  }

  .columns br { display: none }

  pre {
    background: #000;
    display: block;
    color: #fff; 
    padding: 1rem;
  }

  code { font-family: ${type.mono} }

  .copy ul {
    padding-left: 3em;
  }

  .copy ul li:before {
    content: '';
    position: absolute;
    top: 0.8em;
    left: -3rem;
    width: 1.5rem;
    height: 1px;
    background: #000;
  }

  .copy ul li > ul {
    padding-left: 1.5rem;
  }

  .copy ul li > ul li:before {
    left: -1.5rem;
    width: 0.75rem;
  }

  .list ul {
    padding-left: 1.5em;
    list-style: none;
  }

  .list ul li { 
    position: relative;
  }

  .list ul li:before {
    content: '';
    position: absolute;
    top: 0.8em;
    left: -1.5rem;
    width: 0.75rem;
    height: 1px;
    background: #000;
  }

  @font-face {
    font-family: 'Lars Sans';
    src: url('/assets/Lars-Light.eot');
    src: url('/assets/Lars-Light.eot?#iefix') format('embedded-opentype'),
         url('/assets/Lars-Light.woff2') format('woff2'),
         url('/assets/Lars-Light.woff') format('woff');
  }

  @font-face {
    font-family: 'Lars Mono';
    src: url('/assets/Lars-Mono.eot');
    src: url('/assets/Lars-Mono.eot?#iefix') format('embedded-opentype'),
         url('/assets/Lars-Mono.woff2') format('woff2'),
         url('/assets/Lars-Mono.woff') format('woff');
  }
`

var lilgr8 = lilcss(gr8css.toString(), [
  'containers/*.js',
  'views/*.js',
  'index.js'
])

var built = [
  recsst.toString(),
  // gr8css.toString(),
  lilgr8,
  custom,
  typography
].join(' ')

process.stdout.write(built)
