import Api from '@/services/Api'

export default {
    delete (id, data) {
        return Api().delete('/reservation/' + id, data)
    }
}