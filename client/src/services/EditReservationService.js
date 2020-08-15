import Api from '@/services/Api'

export default {
    editReservation (data, id) {
        var url = `reservation/update/` + id
        return Api().patch(url, data)
    }
}