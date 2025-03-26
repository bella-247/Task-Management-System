import { useState, useContext, useMemo } from "react";
import useTasks from "../../hooks/useTasks";
import { ThemeContext } from "../../context/ThemeContext";
import MessageBox from "../MessageBox/MessageBox";

import "./task_manip.css";

const ManipulateTask = ({
    isAdding = false,
    isUpdating = false,
    setIsAdding,
    setIsUpdating,
    editingValues = {}
}) => {
    const defaultEditingValues = useMemo(()=>(
        {
            id : "",
            title: "",
            description: "",
            status: "Not started",
            priority: "low",
            due_date: "",
            due_time: "",
        }
    ), [])

    const { theme } = useContext(ThemeContext);
    const { add_task, update_task, loading, error } = useTasks();
    const [formValues, setFormValues] = useState((editingValues && Object.keys(editingValues).length) ? editingValues : defaultEditingValues);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            if(isAdding){
                add_task(formValues)
            }
            else if(isUpdating){
                update_task(formValues)
            }
            setIsAdding(false)
            setIsUpdating(false)
        }
        catch(err){
            console.error(err)
        }
    };

    return (
        <>
            {loading && <MessageBox mode = "info" content = {isAdding ? "Adding the Task to the database.." : "Updating the task in the databse"}/>}
            {error && <MessageBox mode = 'error' content = {error} timer={true} resetTrigger={error}/>}
            <div className={`add-task-container ${theme}`}>
                <div className="form-container">
                    <form method="POST" id="add-task-form" onSubmit={handleSubmit}>
                        <h1>{isAdding ? "Add Task" : "Task Details"}</h1>
                        <div className="form-group">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formValues.title}
                                onChange={handleChange}
                                spellCheck="true"
                                placeholder="Enter the title here..."
                                required
                            />
                            <label htmlFor="title">Title</label>
                        </div>

                        <div className="form-group">
                            <textarea
                                name="description"
                                id="description"
                                value={formValues.description}
                                onChange={handleChange}
                                spellCheck="true"
                                placeholder="Enter the description here..."
                            ></textarea>
                            <label htmlFor="description">Description</label>
                        </div>

                        <div className="form-group">
                            <select
                                name="status"
                                id="status"
                                value={formValues.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Not started">Not Started</option>
                                <option value="In progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <label htmlFor="status">Status</label>
                        </div>

                        <div className="form-group">
                            <select
                                name="priority"
                                id="priority"
                                value={formValues.priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <label htmlFor="priority">Priority</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="date"
                                name="due_date"
                                id = 'due_date'
                                value= {formValues.due_date}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="due_date">Due Date</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="time"
                                name="due_time"
                                id = "due_time"
                                value={formValues.due_time}
                                onChange={handleChange}
                            />
                            <label htmlFor="due_time">Due Time</label>
                        </div>

                        <button type="submit">
                            {isAdding ? "Add" : "Edit"} Task
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ManipulateTask;
