<template>
  <div class="container-feed">
    <ContentEntry v-for="entry in entries" :entry="entry" :truncate="true" />
  </div>
</template>

<script>
import ContentEntry from './ContentEntry'

export default {
  name: 'FeedEntries',
  components: { ContentEntry },
  computed: {
    entries () {
      const entries = this.$store.state.content['/entries']
      if (!entries) return [ ]
      return entries.pages
        .map(key => this.$store.state.content[key])
        .sort((a, b) => (b.date.replace(/-/g, '') - a.date.replace(/-/g, '')))
    }
  }
}
</script>

<style scoped>
.container-feed > div:not(:first-child) {
  margin-top: 25vh;
}
</style>