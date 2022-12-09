import axios from 'axios';

const actions = {
    upload({}, file) {
        return new Promise((resolve, reject) => {
            let formData = new FormData;
            formData.append('file', file)
            axios
                .post('http://127.0.0.1:8000/api/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    return resolve(response.data)
                })
                .catch((error) => {
                    return reject(error)
                })
        })
    },
    delete({}, fileId){
        return new Promise((resolve, reject) => {
            axios
                .get(`http://127.0.0.1:8000/api/file/delete/${fileId}`)
                .then(response => {
                    return resolve()
                })
                .catch((error) => {
                    return reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    actions
}