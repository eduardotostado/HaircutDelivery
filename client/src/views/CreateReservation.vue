<template>
  <TheMainPanel title='Create a Reservation'>
    <div slot='data'>
      <b-form>
        <div class="half">
          <b-form-select :disabled="isDisabled" v-model="selected" :options="stylistsList"></b-form-select>
          <br>
          <br>
        </div>
        <div>
          <div class="half"> 
            <b-form-datepicker
            id="datepicker-buttons"
            :disabled="isDisabled"
            v-model="date"
            today-button
            reset-button
            close-button
            locale="en"
            calendar-width= "100%"
            dropright
            ></b-form-datepicker>
            <br>
          </div>
          <div class="half">
            <b-form-timepicker :disabled="isDisabled" min-height="100%" dropright v-model="time" locale="en"></b-form-timepicker>
          </div>
        </div>
        <br>
        <b-form-group id="error-label" v-html="error">
        </b-form-group>
        <b-form-group id="success-label" v-html="success">
        </b-form-group>
        <br> 
        <b-button :disabled="isDisabled" @click="submit" variant="dark" >Submit</b-button>
        <b-button @click="cancel" variant="dark" >Cancel</b-button> 
      </b-form>
    </div>
  </TheMainPanel>
</template>

<script>
import CreateReservationService from '@/services/CreateReservationService'
import GetAllStylistsService from '@/services/GetAllStylistsService'
import TheMainPanel from '@/components/TheMainPanel'

export default {
name: "createReservation",
data () {
  return{
      stylists: [],
      stylistsList: [],
      date: null,
      time: null,
      selected: null,
      error: '',
      success: '',
      isDisabled: false
  }
},

components: {
    TheMainPanel
  },

methods: {
    cancel(){
      this.$router.push('/reservations')
    }, 

    async submit() {
      event.preventDefault();
      if(!this.selected == ""){
        if(!this.date == ""){
          if(!this.time == ""){
            try{
              var stylistObject = "";
              
                this.stylists.forEach(element => {
                  if(element._id == this.selected){
                    stylistObject = element;
                  }
                })

              await CreateReservationService.create({
                user: this.$store.state.user,
                stylist: stylistObject,
                date: this.date,
                time: this.time
              })
              this.isDisabled = true;
              this.success = "Success! Redirecting...";
              setTimeout(() => {  this.$router.push('/reservations'); }, 2000);

              } catch (error){
                throw error;
              }
          } else {
            this.error = "Please select a time"
          }
        } else {
            this.error = "Please select a date"
          }
      } else {
            this.error = "Please select a stylist"
          }
    }
},

  async mounted() {
      const response = await GetAllStylistsService.getStylists();

      this.stylistsList.push({
        value: null,
        text: "Please select a Stylist"
      })

      for(var user in response.data.users){
        this.stylists.push(response.data.users[user])
      }

      this.stylists.forEach(element => {
        var tempStylist = {
          value: element._id,
          text: element.name
        }

        // Avoids stylist being able to make a reservation with itself.
        if(this.$store.state.user._id.localeCompare(tempStylist.value)){
          this.stylistsList.push(tempStylist);
        }
      });
  },

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

.half{
  max-width: 55%;
  margin: 0 auto;
}
.form-control{
  margin: 0 auto;
}
</style>
