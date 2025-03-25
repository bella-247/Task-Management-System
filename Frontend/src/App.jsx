import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Forms/LogIn';
import SignUp from "./pages/Forms/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider } from "./context/TasksContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
    window.addEventListener("load", ()=>{
        const token = localStorage.getItem("access_token");
        if(!token && window.location.pathname !== "/login" && window.location.pathname !== "/signup"){
          window.location.href = "/signup";
        }
      })

    return (
        <AuthProvider>
            <ThemeProvider>
                <TasksProvider>
                    <Router>
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="*" element={<h1>Page Not Found</h1>} />
                        </Routes>
                    </Router>
                </TasksProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
