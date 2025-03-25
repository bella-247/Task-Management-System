import { useState, createContext } from "react";

const TasksContext = createContext();

const TasksProvider = ({children})=>{
    const [tasks, setTasks] = useState([]);
    
    return (
        <TasksContext.Provider value = {{tasks, setTasks}}>
            {children}
        </TasksContext.Provider>
    )
}

export {TasksContext, TasksProvider} ;