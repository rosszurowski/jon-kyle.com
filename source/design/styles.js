var gr8 = require('gr8')
var rst = require('recsst')
var dev = require('gr8-dev')
var h = require('bel')

var typography = require('./typography')
var settings = require('./settings')
var css = gr8(settings)

css.add({
  prop: 'font-family',
  hyphenate: true,
  vals: settings.typography
})

css.add({
  prop: 'background-color',
  prefix: 'bg',
  hyphenate: true,
  vals: settings.colors
})

css.add({
  prop: 'color',
  prefix: 'tc',
  hyphenate: true,
  vals: settings.colors
})

var custom = `
  html { font-size: 15px }
  @media (max-width: 450px) {
    html { font-size: 12px }
  }

  .copy *+* { margin-top: 1rem; }

  pre {
    background: #000;
    display: block;
    color: #fff; 
    padding: 1.5em;
  }

  code { font-family: ${settings.typography.mono} }

  h2 {
    font-size: 1em;
    font-weight: normal;
    position: relative;
  }

  h2:before {
    content: '##';
    position: absolute;
    top: 0;
    left: -1.5em;
    text-align: center;
    width: 1rem;
  }
  
  .copy:not(.atdn) a {
    color: #000;
    text-decoration: none;
    border-bottom: 1px solid #000;
    padding-bottom: 0.15em;
  }

  .copy ul li {
    margin-top: 0;
    list-style: none;
    position: relative;
  }

  .copy img {
    height: auto;
    max-width: 100%;
  }

  .copy ul {
    padding-left: 2em;
  }

  .copy ul li:before {
    content: '';
    position: absolute;
    top: 0.8em;
    left: -2em;
    width: 1em;
    height: 1px;
    background: #000;
  }

  .tr-45 {
    display: inline-block;
    transform: rotate(-45deg);
  }

  .em {
    display: inline-block;
    vertical-align: middle;
    width: 0.9rem;
    height: 1px;
    background: #000;
  }
`

function start () {
  const style = h`<style></style>`
  style.innerHTML = custom

  dev.attach()
  css.attach()
  rst.attach()
  typography.start()

  document.head.appendChild(style)
}

function build () {
  const built = rst.toString() +
    css.toString() +
    custom

  if (typeof window === 'undefined') {
    process.stdout.write(built)
  } else {
    return built
  }
}

module.exports = {
  start: start,
  build: build
}
