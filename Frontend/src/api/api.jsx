import axios from "axios"
const API_URL = "http://127.0.0.1:5000"
// const API_URL = "https://task-management-api.onrender.com"


const api = axios.create({
    baseURL: API_URL,
    timeout: 30000, // 30 second timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("access_token");
        
        if (!access_token) {
            window.location.href = "/login";
            return Promise.reject("Access token not found");
        }
        
        const tokenValue = access_token.startsWith('Bearer ') 
            ? access_token 
            : `Bearer ${access_token}`;
            
        config.headers.Authorization = tokenValue;
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 422)) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
