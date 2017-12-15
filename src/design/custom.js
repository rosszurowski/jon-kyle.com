var options = require('./options')

module.exports = `
  html {
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings:"kern" 1; 
    -ms-font-feature-settings:"kern" 1; 
    -o-font-feature-settings:"kern" 1; 
    -webkit-font-feature-settings:"kern" 1; 
    font-feature-settings:"kern" 1;
    font-kerning: normal;
  }

  ::-moz-selection { background: rgba(127, 127, 127, 0.5) }
  ::selection { background: rgba(127, 127, 127, 0.5) }

  .copy a {
    color: ${options.colors.white};
    text-decoration: none;
    border-bottom: 1px solid ${options.colors.grey};
    padding-bottom: 0.2rem;
  }

  .copy a:hover {
    border-bottom: 1px solid ${options.colors.white};
  }

  .copy figure, .copy .embed-responsive { width: 100%; max-width: 100%; }
  .copy img { max-width: 100%; display: block; }

  .embed-responsive { position: relative }
  .embed-responsive > * {
    position: absolute;
    top: 0;
    left: 0; 
    width: 100%;
    height: 100%;
  }

  .embed-responsive-16by9 {
    padding-bottom: 56.25%
  }

  .copy figure a { border: none }

  hr {
    height: 1px;
    width: 100%;
    background: ${options.colors.grey};
    border: 0;
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
    background: ${options.colors.greyLight};
    border-radius: 3px;
    padding: 0.2em;
  }

  .copy > pre,
  pre {
    background: ${options.colors.greyLight};
    padding: 1rem 1.5rem;
    border-radius: 3px;
    overflow: scroll;
    max-width: 100%;
    width: auto;
  }

  pre code {
    background: none;
    padding: 0;
  }

  li {
    list-style: none;
    position: relative;
    padding-left: 1.5rem !important;
  }

  ul li:before {
    content: '';
    position: absolute;
    top: 0.45rem;
    left: 0;
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 50%;
    background: ${options.colors.grey};
  }

  ol li:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }

  ol li:nth-child(1):before { content: '1' }
  ol li:nth-child(2):before { content: '2' }
  ol li:nth-child(3):before { content: '3' }
  ol li:nth-child(4):before { content: '4' }
  ol li:nth-child(5):before { content: '5' }
  ol li:nth-child(6):before { content: '6' }

  ul.list-horiz { border-top: 1px solid #ddd; }
  ul.list-horiz li:before { display: none; }
  ul.list-horiz li { padding: 0 !important }
  .copy ul.list-horiz a { padding: 0.5rem 0; }
  .copy ul.list-horiz a:hover {
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    margin-top: -1px;
    position: static;
    z-index: 2;
  }
  
  .copy > * {
    margin-top: 1.5rem;
    margin-bottom: 1.53rem;
  }

  .copy {
    letter-spacing: 0.01rem;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .copy > * {
    width: 100%;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
  }

  h1, h2 {
    color: #999;
    margin-left: 0;
  }

  .back {
    display: inline-block;
    position: absolute;
    left: 1.5rem;
  }

  .back a {
    border-bottom: 0;
  }

  @media (max-width: 700px) {
    .back { position: static; margin-right: 0.75rem }
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
    src: url('/assets/fonts/Lars-Light.woff2') format('woff2'),
         url('/assets/fonts/Lars-Light.woff') format('woff');
  }

  @font-face {
    font-family: 'Lars Mono';
    src: url('/assets/fonts/Lars-Mono.woff2') format('woff2'),
         url('/assets/fonts/Lars-Mono.woff') format('woff');
  }
`