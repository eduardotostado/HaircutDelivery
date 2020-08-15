<template>
  <div id="app">
    <TheNavigation/>
    <router-view/>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation'
export default {
  name: 'App',
  components: {
    TheNavigation
  }
}
</script>
   
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.custom-control-input[disabled] ~ .custom-control-label, .custom-control-input:disabled ~ .custom-control-label{
  color: white;
}
</style>
