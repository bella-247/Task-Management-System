import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// const API_URL = "http://127.0.0.1:5000/auth";
const API_URL = "https://task-management-api-ukgs.onrender.com/auth"

const useAuth = ()=>{
    const {setRegistered} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                if (response.data){
                    resolve(response.data)
                }
                else{
                    resolve(null)
                }
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

            const { access_token, user } = response.data;
            
            if (!access_token) {
                throw new Error("No access token received");
            }
            
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user", JSON.stringify(user));
            
            return await new Promise((resolve) => {
                resolve(response.data);
            });
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const logOut = ()=>{
        setRegistered(false)
        navigate("/signup")
        localStorage.removeItem("access_token")
        localStorage.removeItem('user')
    }
    
    return {registerUser, loginUser, loading, error, logOut}
}

export default useAuth;
