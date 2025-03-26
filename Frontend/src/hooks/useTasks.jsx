import { useState, useContext} from "react"
import api from "../api/api";
import { TasksContext } from "../context/TasksContext";

const useTasks = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const {tasks, setTasks} = useContext(TasksContext);

    const get_tasks = async ()=>{
        setLoading(true);
        try{
            console.log(api)
            const response = await api.get("/tasks");
            console.log(response)
            setTasks([...response?.data?.tasks]);
            setError(null)
            return "success";
        }
        catch(err){
            setError(err.response?.data?.message || "Failed to fetch tasks")
        }
        finally{
            setLoading(false)
        }
    }

    const add_task = async (taskData)=>{
        setLoading(true);
        try{
            const response = await api.post("/tasks", taskData);
            setTasks([response.data.task, ...tasks]);
            setError(null);
            return response.data;
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to add task");
        }
        finally{
            setLoading(false)
        }
    }

    const update_task = async (taskData)=>{
        setLoading(true);
        try{
            const response = await api.put(`/tasks/${taskData.id}`, taskData);

            const updatedTasks = tasks.map((task)=>{
                return task.id == taskData.id ? response?.data?.task : task;
                });

            setTasks(updatedTasks);
            setError(null);
        }
        catch(err){
            setError(err.response?.data?.message || "Failed to update the task")
        }
        finally{
            setLoading(false)
        }
    }


    
    const delete_task = async (id)=>{
        setLoading(true);
        try{
            const response = await api.delete(`/tasks/${id}`);
            const updatedTasks = tasks.filter((task)=>task.id !== id);
            setError(null);
            setTasks(updatedTasks);
            return response.data;
        }
        catch (err){
            setError(err.response?.data?.message || "Failed to delete the task")
        }
        finally{
            setLoading(false)
        }
    }


    return {
        tasks,
        loading,
        error,
        get_tasks,
        add_task,
        update_task,
        delete_task
    }
}

export default useTasks;



