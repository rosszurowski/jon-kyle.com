<template>
  <header>
    <div><h1><router-link to="/about">Jon-Kyle</router-link></h1></div>
    <div>
      <router-link to="/">Feed</router-link><br>
    </div>
    <div>
      <router-link to="/index">Index</router-link>
    </div>
    <form class="mailinglist" @submit="onSubmit">
      <input type="" name="" placeholder="Mailinglist" v-model="email">
    </form>
  </header>
</template>

<script>
export default {
  name: 'GlobalHeader',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
    }
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

.mailinglist {
  position: relative;
}

.mailinglist span {
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}

input {
  font-size: inherit;
  font-family: var(--sans);
  border: 0;
  background: none;
  outline: 0;
  width: 100%;
  line-height: 1;
}
</style>