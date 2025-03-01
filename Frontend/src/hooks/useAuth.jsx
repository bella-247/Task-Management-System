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
                }, 5000)
                })
        }
        catch (err){
            setError(err.response?.data?.message || "Registration Failed")
        }
        finally{
            console.log("finally block is executed")
            setLoading(false);
        }
    }

    const loginUser = async (userData)=>{
        setLoading(true);
        setError(null);
        try{
            const response = await axios.post(`${API_URL}/login`, userData, {
                headers: {
                    "Content-Type": "application/json"
                }}
            );
            const {access_token, id, username, email, profile} =  response.data;
            
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user", JSON.stringify({id, username, email, profile}));

            console.log("reponse data", response.data)
            
            return await new Promise((resolve)=>{
                console.log("the respones is recieved but i am just waiting before i responed")
                setTimeout(()=>{
                    if (response.data){
                        resolve(response.data)
                    }
                    else{
                        resolve(null)
                    }
                }, 5000);
            })
        }
        catch(err){
            setError(err.response?.data?.message || "Login Failed");
        }
        finally{
            setLoading(false);
        }

    }
    
    return {registerUser, loginUser, loading, error}
}

export default useAuth;