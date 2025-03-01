import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import Home from './pages/Home'
import Login from './pages/Forms/LogIn';
import SignUp from "./pages/Forms/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/Navbar/NavBar";
// import Dashboard from './pages/Dashboard'
// import PrivateRoute from './components/PrivateRoute'
// import { ProvideAuth } from './hooks/useAuth'
// import { ProvideUser } from './hooks/useUser'
// import { ProvideWallet } from './hooks/useWallet'
// import { ProvideTransactions } from './hooks/useTransactions'




const App = () => {
    window.addEventListener("load", ()=>{
        const token = localStorage.getItem("access_token");
        if(!token && window.location.pathname !== "/login" && window.location.pathname !== "/signup"){
          alert("Please login to continue");
          window.location.href = "/login";
        }
      })

    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default App;
