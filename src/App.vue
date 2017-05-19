<template>
  <div id="app">
    <img src="./assets/logo.png">
    <x-drag></x-drag>
  </div>
</template>

<script>
import xDrag from './components/xDrag.vue';

export default {
  name: 'app',
  components: {
    xDrag,
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 10%;
}

img {
  width: 10em;
}
</style>
