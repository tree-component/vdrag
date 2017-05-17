<template>
  <div id="app">
    <x-draggable></x-draggable>
    <img src="./assets/logo.png">
  </div>
</template>

<script>
import xDraggable from './components/xDraggable.vue';

export default {
  name: 'app', components: { xDraggable },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
