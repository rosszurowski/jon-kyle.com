<template>
  <div class="container-feed">
    <ContentEntry
      v-for="entry in visible"
      :entry="entry"
      :truncate="true"
      :key="entry.name"
    />
    <paginate
      v-model="page"
      :page-count="Math.ceil(entries.length / count)"
      :click-handler="handleClick"
      :page-range="count"
      :prev-text="'← Present'"
      :next-text="'Past →'"
      :prev-link-class="'icon-button-arrow left'"
      :next-link-class="'icon-button-arrow right'"
      :container-class="'pagination a-hover'"
    />
  </div>
</template>

<script>
import ContentEntry from './ContentEntry'
import Paginate from 'vuejs-paginate'

export default {
  name: 'FeedEntries',
  components: { ContentEntry, Paginate },
  watch: {
    '$route.query.page': function (page) {
      this.page = parseInt(page) || 1
    }
  },
  data () {
    return {
      page: parseInt(this.$route.query.page) || 1
    }
  },
  computed: {
    entries () {
      const entries = this.$store.state.content['/entries']
      if (!entries) return [ ]
      return entries.pages
        .map(key => this.$store.state.content[key])
        .sort((a, b) => (b.date.replace(/-/g, '') - a.date.replace(/-/g, '')))
    },
    visible () {
      const page = this.page - 1
      return this.entries
        .slice((page * this.count), ((page * this.count) + this.count))
    },
    count () {
      return this.$store.state.ui.count
    }
  },
  methods: {
    handleClick (page) {
      let newQuery = Object.assign({}, this.$route.query, { page: page })
      if (page === 1) delete newQuery.page
      this.$router.push({ path: this.$route.path, query: newQuery })
    }
  }
}
</script>

<style scoped>
.container-feed > div:not(:first-child) {
  margin-top: 5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 4.5rem;
}

.pagination >>> li.disabled a {
  color: rgba(var(--fg), 0.25);
  pointer-events: none;
}

.pagination >>> li.active a {
  color: rgba(var(--fg), 0.25);
}

.pagination >>> a {
  display: block;
  padding: 0.5rem;
  outline: 0;
}
</style>