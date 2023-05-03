<script setup>
import Nav from './components/Nav.vue'


</script>


<style>
#app {
  max-width:600px;
  margin:0 auto;
}
</style>

<template>
  <Nav />
  <router-view></router-view>
</template>