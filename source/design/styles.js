const gr8 = require('gr8')
const rst = require('recsst')
const dev = require('gr8-dev')
const h = require('bel')

const typography = require('./typography')
const settings = require('./settings')
const css = gr8(settings)

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

const custom = `
  html { font-size: 15px }
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
