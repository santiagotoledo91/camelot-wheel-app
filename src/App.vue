<template>
  <div id="app">
    <PWAPrompt/>
    <MainComponent/>
  </div>

</template>

<script>
import MainComponent from './components/MainComponent.vue'
import PWAPrompt from './components/PWAPrompt.vue'

export default {
  name: 'HarmonicMixApp',
  components: {
    MainComponent,
    PWAPrompt
  }
}
</script>

<style lang="scss">

body {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 30s ease infinite;
  height: 100vh;
  width: 100vw;
  margin: 0;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>
