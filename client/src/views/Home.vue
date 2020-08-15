<template>
  <div>
    <TheMainPanel title="Welcome!">
      <div slot="data">  
      <p>
        This website aims to connect users with stylists in order to create haircut reservations that are delivered to your home!
      </p>
      <p>
        If you do not have an account, you can sign up in the top right corner.
      </p>
      <p>
        If you already have an account, press the log in link in the top right corner.
      </p>
      <p>
        Stay safe during these harsh times!
      </p>
      <img src="https://cdn0.iconfinder.com/data/icons/haircut/100/icon_comb_scissor-512.png" alt="" srcset="" />   

      </div>
    </TheMainPanel>

  </div>
</template>

<script>
import TheMainPanel from '@/components/TheMainPanel'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    TheMainPanel
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
