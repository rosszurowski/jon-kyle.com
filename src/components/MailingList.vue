<template>
  <form class="mailinglist" @submit="onSubmit">
    <div>
      <input type="" name="" placeholder="Mailinglist" v-model="address" type="email">
      <span v-html="address || 'Mailinglist'"></span>
    </div>
    <button type="submit" v-if="address">→</button>
  </form>
</template>

<script>
export default {
  name: 'MailingList',
  data () {
    return {
      address: ''
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      // xhr({
      //     method: 'post',
      //     body: new FormData(this.form),
      //     uri: 'https://emailoctopus.com/lists/f54dd2b6-65b9-11e8-a3c9-06b79b628af2/members/embedded/1.1/add'
      // }, function (err, resp, body) {
      //   if (err || resp.statusCode !== 200) {
      //     self.state.error = true
      //   } else {
      //     self.state.success = true
      //   }
      //   self.state.loading = false
      //   self.rerender()
      // })
    }
  }
}
</script>

<style scoped>
.mailinglist {
  display: flex;
  position: relative;
}

button {
  display: block;
  background: none;
  border: none;
  padding: 0 0.5rem;
  margin-left: 0.5rem;
  margin-top: -0.3em;
  font-size: inherit;
  font-family: inherit;
  line-height: 1;
  cursor: pointer;
}

span {
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}

div {
  position: relative;
}

input {
  font-size: inherit;
  font-family: var(--sans);
  border: 0;
  background: none;
  outline: 0;
  width: 100%;
  line-height: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>