<template>
<div id='NavBar'>
  <b-navbar fixed="top" toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand >Haircut Delivery</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-nav>
      <b-nav-item v-if="$store.state.isUserLoggedIn" @click="reservations()">View Reservations</b-nav-item>
      <b-nav-item v-if="$store.state.isUserLoggedIn" @click="createReservations()">Create Reservations</b-nav-item>
      <b-nav-item v-if="$store.state.isUserLoggedIn" @click="account()">Account</b-nav-item>
    </b-navbar-nav>

      <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item right v-if="!$store.state.isUserLoggedIn" @click="logIn()">Log In</b-nav-item>
      <b-nav-item right v-if="!$store.state.isUserLoggedIn" @click="signUp()">Sign Up</b-nav-item>
      <b-nav-item right v-if="$store.state.isUserLoggedIn"  @click="logOut()">Log Out</b-nav-item>

    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>

export default {

data () {
    return {
     
    }
  },

  methods: {
    logIn(){
      this.$router.push("/login")
    },
    signUp(){
      this.$router.push("/register")
    },
    logOut(){
      this.$store.dispatch("logOut")
      this.$router.push("/")
    },
    reservations(){
      this.$router.push("/reservations")
    },
    createReservations(){
      this.$router.push("/reservations/create")
    },
    account(){
      this.$router.push("/account")
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
