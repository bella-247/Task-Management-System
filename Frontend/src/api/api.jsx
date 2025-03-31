import axios from "axios"
const API_URL = "http://127.0.0.1:5000"
// const API_URL = "https://task-management-api.onrender.com"


const api = axios.create({
    baseURL : API_URL
})

api.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("access_token");
        
        // Add debugging
        
        if (!access_token) {
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


api.interceptors.response.use(
    (response) => response, // Pass successful responses through
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 422)) {
            localStorage.removeItem("access_token"); // Clear token
            window.location.href = "/login"; // Redirect to login page
        }

        return Promise.reject(error);
    }
);

export default api;
