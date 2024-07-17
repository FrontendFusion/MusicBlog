import axios from "axios";

const musicService = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 6000,
    headers: {
        "Content-Type": "application/json",
    }
})

musicService.interceptors.request.use((config) => {
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})


musicService.interceptors.response.use((res) => {
    console.log(res)
    if (res.status == 200) {
        return res.data
    } else {
        return Promise.reject(res.data.message)
    }
}, error => {
    return Promise.reject(error)
})

export default musicService;

