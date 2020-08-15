import Api from '@/services/Api'

export default {
    getUser (data) {
        return Api().get('/user/' + data.id, data)
    }
}