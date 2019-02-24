<template>
  <header>
    <div><h1><router-link to="/about">Jon-Kyle</router-link></h1></div>
    <div>
      <router-link to="/">Feed</router-link><br>
    </div>
    <div>
      <router-link to="/index">Index</router-link>
    </div>
    <MailingList />
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
  methods: {

  }
}
</script>

<style scoped>
header {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem 1rem 4rem 1rem;
}

header a.router-link-exact-active {
  text-decoration: none;
}
</style>