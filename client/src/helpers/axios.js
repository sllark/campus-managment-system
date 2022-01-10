import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3344',
    headers: {
        "content-type": "application/json",
    }
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = "bearer " + localStorage.getItem("cmsToken")
    return config
}, (err) => {
    console.log(err)
    return Promise.reject(err)
})
export default instance;