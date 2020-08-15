import Api from '@/services/Api'

export default {
    editUser (data, id) {
        var url = `user/update/` + id
        return Api().patch(url, data)
    }
}