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

  .copy *+* { margin-top: 1.5rem; }

  pre {
    background: #000;
    display: block;
    color: #fff; 
    padding: 1.5em 3rem;
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
    padding-bottom: 0.15rem;
  }

  .bb1 {
    border-bottom: 1px solid #000;
    padding-bottom: 0.15rem;
  }

  .bb1h:hover {
    border-bottom: 1px solid #000;
    padding-bottom: 0.15rem;
  }

  .bb1hc { 
    position: relative;
  }

  .bb1ch:hover .bb1hc:after {
    border-bottom: 1px solid #000;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.3rem;
  }

  .bm1hc {
    position: relative;
  }

  .bm1ch:hover .bm1hc:after {
    border-bottom: 1px solid #000;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.4rem;
  }

  .copy ul li {
    margin-top: 0;
    list-style: none;
    position: relative;
  }

  .copy p { padding-right: 10vw }
  .copy p .image {
    display: block;
    width: calc(100% + 10vw)
  }

  @media (max-width: 767px) {
    .copy p { padding-right: 0 }
    .copy p .image { width: 100% }
  }

  figure {
    margin: 0;
    padding: 0;
  }

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

  .tr-45 {
    display: inline-block;
    transform: rotate(-45deg);
  }

  .em {
    display: inline-block;
    vertical-align: middle;
    width: 0.75rem;
    height: 1px;
    background: #000;
  }

  .em2 {
    display: inline-block;
    vertical-align: middle;
    width: 1.5em;
    height: 1px;
    background: #000;
  }

  .b1b {
    outline: 1px solid #000;
    outline-offset: -1px;
  }

  .imgb1 img {
    border: 1px solid #000;
  }
`

function start () {
  const style = h`<style></style>`
  style.innerHTML = custom

  dev.attach({
    wrapClass: 'px0-5',
    colClass: 'px0-5' 
  })
  
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
