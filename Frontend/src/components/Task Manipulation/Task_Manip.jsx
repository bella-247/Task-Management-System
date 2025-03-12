import { useState, useEffect, useRef } from "react";
import useTasks from "../../hooks/useTasks";
import "./task_manip.css";

const ManipulateTask = ({
    isAdding = false,
    isUpdating = false,
    setIsAdding = () => {},
    setIsUpdating = () => {},
    new_values = {},
}) => {
    const { add_task, loading, error } = useTasks();

    const [formValues, setFormValues] = useState(new_values);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "status":
                setStatus(value);
                break;
            case "priority":
                setPriority(value);
                break;
            case "due_date":
                setDueDate(value);
                break;
            case "due_time":
                setDueTime(value);
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const taskData = {
                title: e.target.title.value,
                description: e.target.description.value,
                status: e.target.status.value,
                priority: e.target.priority.value,
                due_date: e.target.due_date.value,
                due_time: e.target.due_time.value,
            };
            const response = add_task(taskData);
            setIsAdding(false)
            setIsUpdating(false)
        } catch (err) {
            console.log();
        }
    };

    return (
        <div className="add-task-container">
            <div className="form-container">
                <form
                    action="#"
                    method="POST"
                    id="add-task-form"
                    onSubmit={handleSubmit}
                >
                    <h1>Add Task</h1>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            name="status"
                            id="status"
                            value={status}
                            onChange={handleChange}
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select name="priority" id="priority" value={priority} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_date">Due Date</label>
                        <input type="date" name="due_date" value={dueDate} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="due_time">Due Time</label>
                        <input type="time" name="due_time" value={dueTime} onChange={handleChange}/>
                    </div>
                    <button type="submit">{isAdding ? "Add" : "Edit"} Task</button>
                </form>
            </div>
        </div>
    );
}

export default ManipulateTask;
