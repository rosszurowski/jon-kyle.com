<template>
  <main>
    <GlobalHeader />
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<script>
import GlobalHeader from './components/GlobalHeader'
import { mixin } from './store'

export default {
  name: 'Site',
  mixins: [ mixin ],
  components: { GlobalHeader },
  mounted () {
    this.$store.dispatch('fetchEntries')
    if (!this.$store.state.content['/']) {
      this.$store.dispatch('fetchEntry', '/readme.md')
    }
  },
  metaInfo () {
    // let meta = this.site ? Object.assign({ }, this.site.meta) : { }
    let meta = { }

    let metaTags = [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
        vmid: 'og:card'
      },
      {
        name: 'twitter:image',
        content: meta.image,
        vmid: 'og:image'
      },
      {
        name: 'description',
        content: meta.description,
        vmid: 'description'
      },
      {
        property: 'og:description',
        content: meta.description,
        vmid: 'og:description'
      },
      {
        property: 'og:type',
        content: 'website',
        vmid: 'og:type'
      },
      {
        property: 'og:image',
        content: meta.image,
        vmid: 'og:image'
      }
    ]

    if (this.isNotFound) {
      metaTags.push({
        property: 'prerender-status-code',
        content: 404,
        vmid: 'prerender-status-code'
      })
    }

    return {
      title: this.page ? this.page.title : false,
      titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} / Jon-Kyle` : 'Jon-Kyle';
      },
      meta: metaTags
    }
  }
}
</script>

<style>
:root {
  --bg: 255, 255, 255;
  --fg: 0, 0, 0;
  --sans: "Lars Sans", sans-serif;
  --mono: "Lars Mono", menlo, monaco, monospace;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings:"kern" 1; 
  -ms-font-feature-settings:"kern" 1; 
  -o-font-feature-settings:"kern" 1; 
  -webkit-font-feature-settings:"kern" 1; 
  font-feature-settings:"kern" 1;
  font-kerning: normal;
}

body {
  background: rgb(var(--bg));
  color: rgb(var(--fg));
  font-size: 1rem;
  line-height: 1.5;
  font-family: var(--sans);
}

::-moz-selection { background: rgba(127, 127, 127, 0.5) }
::selection { background: rgba(127, 127, 127, 0.5) }

main {
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 5rem;
}


/* Copy */

h1, h2, h3, h4 {
  font-size: inherit;
  font-weight: normal;
}

a {
  color: inherit;
}

.continue-reading {
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  line-height: 1;
  border-radius: 3rem;
  border: 1px solid rgb(var(--fg));
  text-align: center;
  width: 100%;
  max-width: 15rem;
  margin: 0 auto;
}

.mono,
code {
  font-family: var(--mono);
}

.copy {
  --col: 4 / 10;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
  grid-column: 1 / -1;
}

@media (max-width: 950px) {
  .copy { --col: 3 / 11 }
}

@media (max-width: 750px) {
  .copy { --col: 2 / 12 }
}

@media (max-width: 600px) {
  .copy { --col: 1 / -1; --wmx: 100%; }
  .copy figure { grid-column: 1 / -1 !important; }
}

.copy h1,
.copy h2,
.copy h3,
.copy p,
.copy ul,
.copy ol,
.copy section,
.copy .footnotes,
.copy blockquote {
  grid-column: var(--col);
}

.copy figure {
  grid-column: 3 / 11;
  width: 100%;
}

.copy figure img {
  display: block;
  height: auto;
  width: 100%;
}

.copy figure img:not([src]) { opacity: 0 }
.copy figure.ratio { position: relative; background: rgba(var(--fg), 0.2); }
.copy figure.ratio img { height: 0; position: absolute; top: 0; left: 0; height: 100%; width: 100%; }

.copy .footnote-ref a { font-family: var(--mono); text-decoration: none; }
.copy .footnotes-sep { display: none }

.copy a[href*="http"]:after {
  content: '→';
  display: inline-block;
  transform: rotate(-45deg);
  font-family: var(--mono);
}

.copy blockquote {
  border-left: 1px solid rgb(var(--fg));
}

.copy ul,
.copy ol,
.copy blockquote {
  padding-left: 1rem;
}

.video {
  background: #000;
  height: 0;
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
}

.video video {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  outline: 0;
}

@font-face {
  font-family: 'Lars Sans';
  src: url('assets/fonts/Lars-Light.woff2') format('woff2'), url('assets/fonts/Lars-Light.woff') format('woff');
}

@font-face {
  font-family: 'Lars Sans';
  font-style: italic;
  src: url('assets/fonts/Lars-LightItalic.woff2') format('woff2'), url('assets/fonts/Lars-LightItalic.woff') format('woff');
}

@font-face {
  font-family: 'Lars Mono';
  src: url('assets/fonts/Lars-Mono.woff2') format('woff2'), url('assets/fonts/Lars-Mono.woff') format('woff');
}
</style>
