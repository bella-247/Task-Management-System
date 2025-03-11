import { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({children})=>{
    const storage = localStorage.getItem("task-management-user-theme") || 'light';
    const [theme, setTheme] = useState(storage);

    const changeTheme = (newTheme)=>{
        setTheme(newTheme);
        localStorage.setItem('task-management-user-theme', theme);
    }

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProvider};
