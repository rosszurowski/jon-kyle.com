<template>
  <div>
    <div class="empty" v-if="!entries.length">
      No results<br>
      Try again maybe?<br><br>
      🙃
    </div>
    <FeedEntries v-else :entries="entries" />
  </div>
</template>

<script>
import FeedEntries from '@/components/FeedEntries.vue'
import * as lib from '@/store/lib'

export default {
  name: 'Search',
  components: { FeedEntries },
  watch: {
    '$route.query.query': function (query) {
      this.query = query
      if (!this.$store.state.search[this.query]) {
        this.$store.dispatch('fetchSearch', query)
      }
    }
  },
  data () {
    return {
      query: this.$route.query.query,
    }
  },
  mounted () {
    if (!this.$store.state.search[this.query]) {
      this.$store.dispatch('fetchSearch', this.query)
    }
  },
  computed: {
    entries () {
      const entries = this.$store.state.search[this.query]
      if (!entries) return [ ]
      return entries.map(key => this.$store.state.content[key])
    }
  }
}
</script>

<style scoped>
.empty {
  padding: 1rem;
}
</style>