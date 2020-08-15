<template>
  <div>
    <br><br><br>
    <b-card bg-variant="primary" 
    text-variant="white" 
    v-bind:title='title'>
    <br><br>
    <slot name='data'>
                
    </slot>            
    </b-card>
  </div>
</template>

<script>
export default {
  name: "themainpanel",
  data () {
    return {
     
    }
  },
  props: [
      'title'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  min-width: 400px;
  max-width: 75%;
  margin: 0 auto;
}
</style>
