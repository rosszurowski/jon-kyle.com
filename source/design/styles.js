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

  .copy-indent p, .copy-indent ul { padding-right: 10vw }
  .copy-indent p .image {
    display: block;
    width: calc(100% + 10vw)
  }

  @media (max-width: 767px) {
    .copy-indent p, .copy-indent ul { padding-right: 0 }
    .copy-indent p .image { width: 100% }
  }

  .image img,
  .image video {
    margin: 0;
  }

  video {
    z-index: 3;
  }

  .video {
    background: #000;
  }

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

  hr,
  .em2 {
    display: inline-block;
    vertical-align: middle;
    border: 0;
    width: 1.5em;
    margin: 0;
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

  .arrow {
    display: inline-block;
    position: relative;
    vertical-align: bottom;
    transform-origin: 50% 50%;
    margin-bottom: 6px;
    margin-left: 3px;
    height: 5px;
    width: 5px;
  }

  .arrow:after {
    background: #000;
    content: '';
    position: absolute;
    top: 2px;
    height: 1px;
    width: 7px;
  }

  .arrow:before {
    border: 1px solid #000;
    border-left: 0;
    border-bottom: 0;
    content: '';
    position: absolute;
    transform-origin: 50% 50%;
    transform: rotate(-135deg);
    height: 5px;
    width: 5px;
  }

  .arrow.arrow-up { transform: rotate(90deg) }
  .arrow.arrow-down { transform: rotate(-90deg) }
  .arrow.arrow-top-right { transform: rotate(135deg) }

  .arrow.arrow-top-right { margin-left: 5px; margin-bottom: 7px }
  .arrow.arrow-top-right:after { width: 9px }

  .copy ul.columns {
    padding-left: 0;
    column-gap: 0;
  }

  .copy ul.columns li:before {
    display: none;
  }

  .copy .columns br { display: none }
  .tcg1 { column-gap: 1rem; margin-top: 0.5rem }
  .tcg1 *+* { margin-top: 1rem }

  pre {
    margin: 0;
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
