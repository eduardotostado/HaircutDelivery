<template>
  <TheMainPanel title='Update Reservation'>
    <div slot='data'>
      <b-form>
        <div class="half">
          <b-form-select disabled v-model="selected" :options="stylistsList"></b-form-select>
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
        <b-button :disabled="isDisabled" @click="submit" variant="dark" >Update</b-button>
        <b-button :disabled="isDisabled" @click="cancel" variant="dark" >Cancel</b-button> 
      </b-form>
    </div>
  </TheMainPanel>
</template>

<script>
import GetReservationService from '@/services/GetReservationService'
import EditReservationService from '@/services/EditReservationService'
import TheMainPanel from '@/components/TheMainPanel'

export default {
name: "updateReservation",
data () {
  return{
      reservation: {},
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
        if(!this.date == ""){
          if(!this.time == ""){
            try{
              await EditReservationService.editReservation({
                date: this.date,
                time: this.time
              }, this.reservation._id)
              this.isDisabled = true;
              this.error = "";
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

    }
},

  async mounted() {
    
      //Load the current stylist
      const response = await GetReservationService.getReservation(this.$route.params.id);
      console.log(response);
      this.reservation = response.data;
      this.stylist = this.reservation.stylist;
      var dateTemp = this.reservation.date
      dateTemp = dateTemp.substring(0, dateTemp.indexOf("T"));
      this.date = dateTemp;
      this.time = this.reservation.time;

      this.stylistsList = [{
        value: this.stylist._id,
        text: this.stylist.name
      }]

      this.selected = this.stylist._id;
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

.half{
  max-width: 55%;
  margin: 0 auto;
}
.form-control{
  margin: 0 auto;
}
</style>
