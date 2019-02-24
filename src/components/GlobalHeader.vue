<template>
  <header>
    <div><h1><router-link to="/about">Jon-Kyle</router-link></h1></div>
    <nav>
      <div><router-link to="/">Feed</router-link>,</div>
      <div><router-link to="/index">Index</router-link>,</div>
      <MailingList v-if="mailingListVisible" />
    </nav>
    <button class="toggle-light" @click="toggleLight">{{nightText}}</button>
  </header>
</template>

<script>
import MailingList from './MailingList'

export default {
  name: 'GlobalHeader',
  components: { MailingList },
  data () {
    return {
      email: ''
    }
  },
  computed: {
    mailingListVisible () {
      return true
      return this.$store.state.options.subscribed === false
    },
    nightText () {
      return this.$store.state.options.night 
        ? '☀'
        : '☾'
    }
  },
  methods: {
    toggleLight () {
      this.$store.commit('setOptions', { night: !this.$store.state.options.night })
    }
  }
}
</script>

<style scoped>
header {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 3fr;
  padding: 1rem 1rem 4rem 1rem;
  margin-top: -0.3rem;
}

header a.router-link-exact-active {
  text-decoration: none;
}

nav {
  display: flex;
}

nav > * {
  margin-right: 0.3em;
}

.toggle-light {
  background: none;
  color: inherit;
  border: 0;
  font-size: 1rem;
  position: absolute;
  top: 0;
  line-height: 1;
  right: 0;
  padding: 0.95rem 1rem;
  outline: 0;
  cursor: pointer;
}
</style>