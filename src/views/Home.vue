<template>
  <FeedEntries :entries="entries" />
</template>

<script>
import FeedEntries from '@/components/FeedEntries.vue'

export default {
  name: 'Home',
  components: { FeedEntries },
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
</style>