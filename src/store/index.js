import Vue from 'vue'
import Vuex from 'vuex'
import * as matter from 'gray-matter'
import dayjs from 'dayjs'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    api: {
      location: 'https://raw.githubusercontent.com/jondashkyle/archive/',
      branch: process.env.VUE_APP_BRANCH || 'master',
      endpoint: '/.netlify/functions/'
    },
    content: {
      entries: { }
    }
  },
  mutations: {
    setApi (state, payload = { }) {
      state.api = Object.assign({ }, state.api, payload)
    },
    setEntry (state, payload = { }) {
      const data = matter(payload.data)
      const url = payload.url || '/'
      Vue.set(state.content, url,  {
        ...state.content[url],
        ...data.data,
        content: data.content.trim(),
        _loaded: true
      })
    },
    setEntries (state, payload = [ ]) {
      Vue.set(state.content, '/entries', { pages: [ ] })
      payload.forEach(entry => {
        const meta = getEntryMeta(entry)
        state.content['/entries'].pages.push(meta.url)
        Vue.set(state.content, meta.url, meta)
      })
    }
  },
  actions: {
    fetchEntry ({ commit, state }, url = '') {
      const path = url.replace('/readme', '').replace('.md', '')
      if (!url) return
      fetch(state.api.location + state.api.branch + url)
        .then(response => response.text())
        .then(data => commit('setEntry', { url: path, data }))
        .catch(err => console.warn(err))
    },
    fetchEntries({ commit, state }) {
      fetch(state.api.endpoint + '/entries?ref=' + state.api.branch)
        .then(response => response.json())
        .then(data => commit('setEntries', data))
        .catch(err => console.warn(err))
    }
  },
})

const mixin = {
  computed: {
    page () {
      return this.$store.state.content[this.$route.path]
    }
  }
}

function getEntryMeta (entry) {
    const name = entry.name.replace(/.md/g, '')
    const date = name.substring(0, 10)
    const url = '/' + entry.path.replace(/.md/g, '')
    const src = '/' + formatEntrySrc(entry.path)
    const dateFormatted = dayjs(date).format('MMM DD,YYYY')
    return { name, date, src, url, dateFormatted }
}

export { mixin }
export default store

function formatEntrySrc (str)  {
  return str.substring(str.length - 2, str.length) === 'md'
    ? str
    : str + '/readme.md'
}