var html = require('choo/html')

var { parseImageFilename } = require('../lib/media')

module.exports = projectThumb

function projectThumb (props) {
  var meta = parseImageFilename(props.path)
  return html`
    <div
      class="bg-greylight psr w100"
      style="padding-bottom: ${meta.dimensions.ratio * 100}%"
    >
      <img src="${props.path}" class="psa t0 l0 b0 r0 h100 w100 db">
      ${meta.border ? html`<div class="psa t0 l0 r0 b0 pen img-border"></div>` : ''}
    </div>
  `
}
