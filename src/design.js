var html = require('choo/html')
var gr8 = require('gr8')
var recsst = require('recsst')
var lilcss = require('lilcss')

var gr8css = gr8({
  breakpoints: {
    lg: '1000px',
    md: '767px',
    sm: '500px'
  },
  lineHeight: [1, 1.5].map(size => {
    return { [size.toString().replace('.', '-')]: size * 1.1 }
  }),
  fontSize: [1],
  spacing: [0, 1, 2, 3, 4].map(size => {
    return { [size.toString().replace('.', '-')]: size / 2 }
  }),
  responsive: true
})

var type = {
  sans: '"Lars Sans", sans-serif',
  mono: '"Lars Mono", menlo, monaco, monospace'
}

var colors = {
  white: '#000',
  black: '#fff',
  grey: '#ccc',
  greyLight: '#eee'
}

// fonts
gr8css.add({
  prop: 'font-family',
  vals: type
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

// rag widths
gr8css.add({
  prop: 'width',
  prefix: 'wr',
  unit: 'rem',
  vals: [0, 5, 10, 15, 20]
})

// viewport min heights
gr8css.add({
  prop: 'min-height',
  prefix: 'vhmn',
  unit: 'vh',
  vals: [0, 25, 33, 50, 66, 75]
})

var custom = `
  html { font-size: 100% }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-moz-selection { background: rgba(127, 127, 127, 0.5) }
  ::selection { background: rgba(127, 127, 127, 0.5) }

  .copy a {
    color: ${colors.white};
    text-decoration: none;
    border-bottom: 1px solid ${colors.grey};
    padding-bottom: 0.2rem;
  }

  .copy a:hover {
    border-bottom: 1px solid ${colors.white};
  }

  h1, h2 {
    font-weight: normal;
    font-size: 1rem;
  }

  h2:not(:first-child) { margin-top: 3rem }

  code, pre {
    font-size: 1rem;
    font-family: 'Lars Mono', menlo, monaco, monospace;
  }

  code {
    background: ${colors.greyLight};
    border-radius: 3px;
    padding: 0.2em;
  }

  pre {
    background: ${colors.greyLight};
    padding: 1rem 1.5rem;
    border-radius: 3px;
    overflow: scroll;
  }

  pre code {
    background: none;
    padding: 0;
  }

  li {
    padding-left: 1.5rem;
    list-style: none;
    position: relative;
  }

  li:before {
    content: '';
    position: absolute;
    top: 0.45rem;
    left: 0;
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 50%;
    border: 1px solid ${colors.white};
  }
`

var typography = `
  .copy > * {
    margin-top: 1.5rem;
    margin-bottom: 1.53rem;
  }

  .copy {
    letter-spacing: 0.01rem;
    width: 100%;
    max-width: 35rem;
    margin-left: 6rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  h1, h2 {
    margin-left: -6rem;
  }

  .back {
    display: inline-block;
    width: 6rem;
  }

  @media (max-width: 700px) {
    .copy { margin-left: 0 }
    h1, h2 { margin-left: 0 }
    .back { width: auto; margin-right: 0.75rem }
  }

  .copy > *:first-child { margin-top: 0 }
  .copy > *:last-child { margin-bottom: 0 }

  /*
  .copy a[href*="//"] {
    margin-right: 1rem;
  }

  .copy a[href*="//"]:after {
    content: '→';
    display: inline-block;
    vertical-align: bottom;
    margin-right: -1rem;
    transform: rotate(-45deg);
  }
  */

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

var lilsrc = [
  'containers/*.js',
  'routes/*.js',
  'index.js'
].map(p => 'src/' + p)

var lilopts = {
  ignore: ['psa', 'psr', 't0', 'b0', 'l0', 'r0']
}

var lilgr8 = lilcss(gr8css.toString(), lilsrc, lilopts)

var built = [
  recsst.toString(),
  lilgr8,
  custom,
  typography
].join(' ')

process.stdout.write(built)
