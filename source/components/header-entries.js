var h = require('bel')
var x = require('xtend')

module.exports = EntriesHeader

function EntriesHeader (opts) {
  var o = x({
    flip: false,
    key: '',
    entriesActive: 0, 
    handleClick: key => { },
    handleReset: () => { },
    handleShowAll: () => { }
  }, opts)

  var arrow = key => h`
    <span class="ff-mono ${o.key === key ? 'op100' : 'op0'}">
      <div class="arrow arrow-${!o.flip ? 'down' : 'up'}"></div>
    </span>
  `

  var expand = () => h`
    <div class="curp" onclick=${o.handleShowAll}>+</div>
  `

  var collapse = () => h`
    <div class="curp" onclick=${o.handleReset}>×</div>
  `

  return h`
    <div class="x c12 usn">
      <div class="p0-5 c2" sm="c3">
        <span
          class="curp"
          onclick=${() => o.handleClick('date')}
        >date ${arrow('date')}</span>
      </div>
      <div class="p0-5 c2" sm="dn">
        <span
          class="curp"
          onclick=${() => o.handleClick('type')}
        >type ${arrow('type')}</span>
      </div>
      <div class="p0-5 c7" sm="c8">
        <span
          class="curp"
          onclick=${() => o.handleClick('title')}
        >title ${arrow('title')}</span>
      </div>
      <div class="c1 tar p0-5">
        ${o.entriesActive > 0 ? collapse() : expand() } 
      </div>
    </div>
  `
}