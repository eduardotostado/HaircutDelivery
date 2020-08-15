<template>
  <TheMainPanel title='Register'>
    <div slot='data'>
      <b-form @submit="register">
        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="name"
            required
            placeholder="Enter name"
            :disabled="isDisabled"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Email address:">
          <b-form-input
            id="input-2"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
            :disabled="isDisabled"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Password:">
          <b-form-input
            id="input-3"
            v-model="password"
            type="password"
            required
            placeholder="Enter a Password (Min 8 characters)"
            :disabled="isDisabled"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="Address:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="address"
            required
            placeholder="Address"
            :disabled="isDisabled"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-5" label="Phone Number:" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="phone"
            type="tel"
            required
            placeholder="000-000-0000"
            :disabled="isDisabled"
      
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox
        id="checkbox-1"
        v-model="isStylist"
        name="checkbox-1"
        >
          I am a stylist (not a client)
        </b-form-checkbox>
          
        <b-form-group id="error-label" v-html="error">
        </b-form-group>
        <b-form-group id="success-label" v-html="success">
        </b-form-group>
        <b-button type="submit" variant="dark" :disabled="isDisabled">Submit</b-button>
      </b-form>
    </div>
  </TheMainPanel>
</template>

<script>
import RegisterUser from '@/services/RegisterUser'
import TheMainPanel from '@/components/TheMainPanel'

export default {
name: "register",
data () {
    return {
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      isStylist: false,
      error: '',
      success: '',
      isDisabled: false
    }
  },

  components: {
    TheMainPanel
  },

  methods: {
    async register() {
      event.preventDefault();
      try{
          await RegisterUser.register({
            name: this.name,
            email: this.email,
            password: this.password,
            address: this.address,
            phone: this.phone,
            isStylist: this.isStylist
          })

        this.name = null;
        this.email = null;
        this.password = null;  
        this.address = null;
        this.phone = null;
        this.isStylist = false;
        this.error = null;
        this.success = "Success! Redirecting...";
        this.isDisabled = true;

        setTimeout(() => {  this.$router.push('/login'); }, 2000);


        } catch (error){
            try{
            this.error = "This email is already associated with an account";
            this.error = error.response.data.errors.password.properties.message;
            } catch (err){
                throw err;
            }
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
