<template>
  <div>
    <TheMainPanel :title="title">
      <div slot="data">  
        <b-table dark striped hover :items="items" :fields="fields">
          <template v-slot:cell(edit)="data">
            <b-btn :disabled="data.item.isDisabled" variant="success" size="sm" v-on:click="editReservation(data.item.edit)">Edit</b-btn>
          </template>
           <template v-slot:cell(delete)="data">
            <b-btn variant="danger" size="sm" v-on:click="deleteReservation(data.item.delete)">Delete</b-btn>
          </template>
        </b-table>
      </div>
    </TheMainPanel>

  </div>
</template>

<script>
import TheMainPanel from '@/components/TheMainPanel'
import GetAllReservationsService from '@/services/GetAllReservationsService'
import DeleteReservation from '@/services/DeleteReservationService'

export default {
  name: 'Reservation',
  data () {
    return {
      title: "",
      fields: ['client_name', 'client_address', 'client_phone', 'stylist_name', 'stylist_phone', 'reservation_date', 'reservation_time',  'edit', 'delete'],
      items: [],
      isDisabled: false
    }
  },

  components: {
    TheMainPanel
  },

  methods: {
    editReservation(id){
      this.$router.push('/reservations/update/' + id)
    },

    async deleteReservation(id){
      event.preventDefault();
      try{
        await DeleteReservation.delete(id)

        this.items = [];
        this.loadData();
      
      }catch (error){
        throw error;
      }

        alert("Reservation Deleted.")
    },

    async loadData(){
      // set items into an array of json objects and then loop through each index and add data to the table
     const response = await GetAllReservationsService.getReservations(this.$store.state.user) 

     for(var index in response.data){
       var tempDate = response.data[index].date;
       tempDate = tempDate.substring(0, tempDate.indexOf("T"));
       const tempObject = {
         client_name: response.data[index].user.name, 
         client_address: response.data[index].user.address, 
         client_phone: response.data[index].user.phone, 
         stylist_name: response.data[index].stylist.name, 
         stylist_phone: response.data[index].stylist.phone, 
         reservation_date: tempDate, 
         reservation_time: response.data[index].time, 
         edit:  response.data[index]._id,
         delete: response.data[index]._id,
         isDisabled: (this.$store.state.user._id != response.data[index].user._id)
       }
       this.items.push(tempObject);
     }
    }
  },
  
  async mounted(){
    this.title = "Welcome, " + this.$store.state.user.name + ". Your reservations:"

    this.loadData();
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
