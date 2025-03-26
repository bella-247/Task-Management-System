import { createContext, useState} from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [registered, setRegistered] = useState(localStorage.getItem("access_token") || false);

    return (
        <AuthContext.Provider value = {{registered, setRegistered}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};