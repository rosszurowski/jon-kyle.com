import Prism from 'prismjs'

/**
 * Code Highlighting
 */
const codeEls = [...document.querySelectorAll('code')]
codeEls.forEach(el => {
  el.classList.add('language-js')
  Prism.highlightElement(el)
})

let ratioWide

const setRatioClass = () => {
  const ratio = window.innerWidth / window.innerHeight
  let newRatio

  if (ratio >= 1.3) {
    newRatio = true
  } else {
    newRatio = false
  }

  if (newRatio !== ratioWide) {
    if (newRatio) {
      document.body.classList.add('ratio-wide')
    } else {
      document.body.classList.remove('ratio-wide')
    }

    ratioWide = newRatio
  }
}

setRatioClass()
window.addEventListener('resize', setRatioClass, false)

/**
 * Videos
 */
const videoEls = Array.from(document.querySelectorAll('video'))

videoEls.forEach((el) => {
  const containerEl = document.createElement('div')
  const ratio = el.getAttribute('height') / el.getAttribute('width')
  const frame = el.getAttribute('data-frame')

  // Container Ratio
  containerEl.classList.add('video-buffering', 'video')
  Object.assign(containerEl.style, {
    backgroundImage: `url(${frame})`,
    paddingBottom: ratio * 100 + '%'
  })

  // Wrap
  el.parentNode.insertBefore(containerEl, el)
  containerEl.appendChild(el)

  // Play
  containerEl.addEventListener('click', e => {
    containerEl.classList.remove('video-buffering')
    el.play()
  })
})

/**
 * Homepage centering
 */
const homeRowEls = [...document.querySelectorAll('[data-row]')]
const alignments = ['left', 'center', 'right']

homeRowEls.forEach(el => {
  const elId = el.getAttribute('data-row')
  const styleEl = document.createElement('style')
  const elLeft = (Math.random() * 20)
  const elWidth = (Math.random() * (20 - elLeft)) + 80
  const elAlign = alignments[Math.floor(Math.random() * alignments.length)]

  styleEl.innerHTML = `
    .ratio-wide [data-row="${elId}"] {
      margin-left: ${elLeft}%;
      text-align: ${elAlign};
      width: ${elWidth}%;
    }
  `
  el.appendChild(styleEl)
})
