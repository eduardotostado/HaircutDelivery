<template>
  <TheMainPanel title= "Log In">
    <div slot='data'>
      <b-form @submit="login">
        <b-form-group id="input-group-1" label="Email address:">
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:">
          <b-form-input
            id="input-2"
            v-model="password"
            type="password"
            required
            placeholder="Enter Password"
          ></b-form-input>
        </b-form-group>
          
        <b-form-group id="error-label" v-html="error">
        </b-form-group>

        <b-button type="submit" variant="dark">Log In</b-button>
      </b-form>
    </div>
  </TheMainPanel>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import TheMainPanel from '@/components/TheMainPanel'

export default {
name: "login",
data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  components: {
    TheMainPanel
  },

  methods: {
    async login() {
    event.preventDefault();
      try{
          const response = await AuthenticationService.authenticate({
            email: this.email,
            password: this.password
          })

          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)

          this.$router.push('/reservations')

        } catch (error){
                this.error = error.response.data.error;
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#error-label{
  color:red;
}

#success-label{
  color: #69F0AE;
  font-weight: bold;
  font-size: 20px;
}

.form-control{
  margin: 0 auto;
}

input{
  max-width: 75%;
}
</style>
