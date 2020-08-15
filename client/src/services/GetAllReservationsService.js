import Api from '@/services/Api'

export default {
    getReservations (data) {
        return Api().post('/reservations', data)
    }
}