import axios from "axios"

const API_URL = "http://127.0.0.1:5000"

const api = axios.create({
    baseURL : API_URL
})

api.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("access_token");
        
        // Add debugging
        
        if (!access_token) {
            alert("Access token not found, please log in again");
            window.location.href = "/login";
            return Promise.reject("Access token not found");
        }
        
        // Make sure there's no 'Bearer ' prefix already in the token
        const tokenValue = access_token.startsWith('Bearer ') 
            ? access_token 
            : `Bearer ${access_token}`;
            
        config.headers.Authorization = tokenValue;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
