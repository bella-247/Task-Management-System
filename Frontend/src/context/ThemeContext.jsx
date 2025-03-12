import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("task-management-user-theme") || "light";
    });

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('task-management-user-theme', newTheme);
    };

    useEffect(() => {
        if (!localStorage.getItem("task-management-user-theme")) {
            localStorage.setItem('task-management-user-theme', theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
export { ThemeContext, ThemeProvider };
