<template>
  <TheMainPanel title='Your Account'>
    <div slot='data'>
      <b-form>
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
        :disabled="isDisabled"
        >
          I am a stylist
        </b-form-checkbox>
          
        <b-form-group id="error-label" v-html="error">
        </b-form-group>
        <b-form-group id="success-label" v-html="success">
        </b-form-group>
        <b-button @click="edit" variant="dark" v-if="isDisabled">Edit</b-button>
        <b-button @click="submit" variant="dark" v-if="!isDisabled">Update</b-button>
        <b-button @click="cancel" variant="dark" v-if="!isDisabled">Cancel</b-button>
      </b-form>
    </div>
  </TheMainPanel>
</template>

<script>
import EditUser from '@/services/EditUser'
import TheMainPanel from '@/components/TheMainPanel'
import GetUser from '@/services/GetUser'

export default {
name: "register",
data () {
    return {
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      address: this.$store.state.user.address,
      phone: this.$store.state.user.phone,
      isStylist: this.$store.state.user.isStylist,
      error: '',
      success: '',
      isDisabled: true
    }
  },

  components: {
    TheMainPanel
  },

  methods: {
    edit(){
      this.isDisabled = !this.isDisabled;
    },

    cancel(){
      this.isDisabled = !this.isDisabled;
      this.name = this.$store.state.user.name;
      this.email = this.$store.state.user.email;
      this.address = this.$store.state.user.address;
      this.phone = this.$store.state.user.phone;
      this.isStylist = this.$store.state.user.isStylist;
    },

    async getUser(){
       event.preventDefault();
       try{
          
          const response = await GetUser.getUser({
            id: this.$store.state.user._id
          })

          this.$store.dispatch("setUser", response.data.user)
          
        } catch (err){
          throw err;
        }
    },

    async submit() {
      event.preventDefault();
      try{
          await EditUser.editUser({
            name: this.name,
            email: this.email,
            address: this.address,
            phone: this.phone,
            isStylist: this.isStylist
          }, this.$store.state.user._id,)

        this.error = null;
        this.success = "Success! Redirecting...";
        this.isDisabled = true;

        // this.$store.dispatch('setUser', response);
        setTimeout(() => {  this.$router.push('/reservations'); }, 2000);


        } catch (error){
            try{
              console.log(error)
            this.error = error.response;
            } catch (err){
                throw err;
            }
        }

        this.getUser();
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
