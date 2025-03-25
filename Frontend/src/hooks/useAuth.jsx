import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/auth";

const useAuth = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (userData) => {
        setLoading(true);
        setError(null);
        try{
            const response = await axios.post(`${API_URL}/register`, userData, {
                headers: {
                    "Content-Type": "application/json"
                }}
            );
            
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            return await new Promise(resolve =>{
                setTimeout(()=>{
                    if (response.data){
                        resolve(response.data)
                    }
                    else{
                        resolve(null)
                    }
                }, 1000)
                })
        }
        catch (err){
            setError(err.response?.data?.message || "Registration Failed")
        }
        finally{
            setLoading(false);
        }
    }

    const loginUser = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/login`, userData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // Add debugging
            
            const { access_token, user } = response.data;
            
            if (!access_token) {
                throw new Error("No access token received");
            }
            
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user", JSON.stringify(user));
            
            return await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(response.data);
                }, 1000);
            });
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };
    
    return {registerUser, loginUser, loading, error}
}

export default useAuth;
