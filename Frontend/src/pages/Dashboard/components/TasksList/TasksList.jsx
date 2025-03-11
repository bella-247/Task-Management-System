import {useLayoutEffect} from "react";
import "./TasksList.css";
import useTasks from "../../../../hooks/useTasks";

const TasksList = () => {
    const {tasks, get_tasks} = useTasks();

    const statuses = {
        "not-started": "not-started",
        "in progress": "in-progress",
        completed: "completed",
        get: (value) => {
            return statuses[value.toLowerCase()] || "";
        },
    };

    useLayoutEffect(() => {
        get_tasks();
    }, []);

    return (
        <ul className= {`tasks-list-container ${tasks.length == 0 && 'no-task'}`} >
            {tasks.map((task, index) => {
                return (
                    <li key={index} className="tasks">
                        <div className="task-content-container">
                            <div className="title">{task.title}</div>
                            <div className="description">
                                {task.description}
                            </div>
                        </div>
                        <div className="properties-container">
                            <div className="dones properties">
                                {task.isDone ? "Done" : "Not Done"}
                            </div>
                            <div
                                className={`statuses ${statuses.get(
                                    task.status
                                )} properties`}
                            >
                                {task.status}
                            </div>
                        </div>
                        <div className="editing-btns-container">
                            <div className="edit-btns btns">Edit</div>
                            <div className="delete-btns btns">Del</div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default TasksList;
