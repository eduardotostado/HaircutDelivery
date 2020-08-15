import Api from '@/services/Api'

export default {
    getStylists (data) {
        return Api().get('/stylists', data)
    }
}