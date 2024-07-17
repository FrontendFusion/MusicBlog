import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:1337",
    timeout: 6000,
    headers: {
        "Content-Type": "application/json",
    }
})

service.interceptors.request.use((config) => {
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})


service.interceptors.response.use((res) => {
    console.log(res)
    if (res.status == 200) {
        return res.data
    } else {
        return Promise.reject(res.data.message)
    }
}, error => {
    console.error(error)
    return Promise.reject(error?.response?.data)
})

export default service

