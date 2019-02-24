<template>
  <header>
    <div><h1><router-link to="/about">Jon-Kyle</router-link></h1></div>
    <nav>
      <div><router-link to="/">Feed</router-link>,</div>
      <div><router-link to="/index">Index</router-link>,</div>
      <MailingList v-if="mailingListVisible" />
    </nav>
    <div :class="['toggle-light', { night: isNight }]" @click="toggleLight">
      <svg width="100px" height="100px" viewBox="0 0 100 100">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="orb">
              <circle id="disc" fill="rgba(var(--fg))" cx="20" cy="20" r="20"></circle>
              <circle id="cut" fill="rgb(var(--bg))" cx="20" cy="20" r="20"></circle>
            </g>
            <path d="M51,21 L48,21 L48,4 L51,4 L51,21 Z M51.75,96 L48.75,96 L48.75,79 L51.75,79 L51.75,96 Z M4.5,51.5 L4.5,48.5 L21.5,48.5 L21.5,51.5 L4.5,51.5 Z M78.5,51.5 L78.5,48.5 L95.5,48.5 L95.5,51.5 L78.5,51.5 Z M17.0841793,19.0191036 L19.2054997,16.8977832 L31.226315,28.9185985 L29.1049946,31.0399189 L17.0841793,19.0191036 Z M69.4100811,71.3450054 L71.5314015,69.223685 L83.5522168,81.2445003 L81.4308964,83.3658207 L69.4100811,71.3450054 Z M18.5691036,83.3658207 L16.4477832,81.2445003 L28.4685985,69.223685 L30.5899189,71.3450054 L18.5691036,83.3658207 Z M70.8950054,31.0399189 L68.773685,28.9185985 L80.7945003,16.8977832 L82.9158207,19.0191036 L70.8950054,31.0399189 Z" id="rays" fill="rgb(var(--fg))"></path>
          </g>
      </svg> 
    </div>
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
    isNight () {
      return this.$store.state.options.night 
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
  padding: 0.75rem;
  outline: 0;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
}

svg {
  height: 1.5rem;
  width: 1.5rem;
}

svg path {
  transform-origin: 50% 50%;
  transition: transform 150ms ease-out, opacity 150ms ease-out;
}

.toggle-light.night svg path {
  opacity: 0;
  transform: scale(0.8);
}

#orb {
  transform-origin: 50% 50%;
  transition: transform 150ms ease-out, opacity 150ms ease-out;
  transform: translate(30px, 30px);
}

#cut {
  transition: transform 150ms ease-out, opacity 150ms ease-out;
  transform-origin: 50% 50%;
  transform: translate(30px, -30px);
}

.toggle-light.night #cut {
  transform: translate(10px, -10px);
}

.toggle-light.night #orb {
  transform: scale(1.3) translate(30px, 30px);
}

</style>