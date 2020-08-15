import Api from '@/services/Api'

export default {
    getReservation (data) {
        return Api().get('/reservation/' + data, data)
    }
}