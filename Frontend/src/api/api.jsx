import axios from "axios"

const API_URL = "http://127.0.0.1:5000"

const api = axios.create({
    baseURL : API_URL
})

api.interceptors.request.use(
    (config)=>{
        const access_token = localStorage.getItem("access_token")

        if(!access_token){
            alert("Access token not found, please log in again")
            window.location.href = "/login"
            return Promise.reject("Access token not found")
        }
        
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default api;