import {useLayoutEffect, useState} from "react";
import "./TasksList.css";
import useTasks from "../../../../hooks/useTasks";
import MessageBox from "../../../../components/MessageBox/MessageBox";

const TasksList = ( {Edit, taskLists} ) => {
    const {tasks, get_tasks, delete_task, loading, error} = useTasks();
    const ListOfTasks = taskLists || tasks;
    const [isDeleting, setIsDeleting] = useState(false);
    const classMapper = {
        // statuses
        'not started' : 'bad',
        'in progress' : 'warn',
        'completed' : 'good',

        // priorities
        'high' : "bad", 
        'medium' : 'warn',
        'low' : 'good',

        get: (value) => {
            return classMapper[value.toLowerCase()] || "";
        }
    }

    

    const extractDate = (date)=>{
        const months = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        }
        let [day, month, year] = date.split(" ").slice(1, 4);
        date = `${year}-${months[month]}-${day}`;
        return date;
    }

    useLayoutEffect(() => {
        get_tasks();
    }, []);

    const Delete = (id)=>{
        setIsDeleting(true)
        try{
            delete_task(id);
        }
        catch(err){
            console.error(err)
        }
        finally{
            setIsDeleting(false)
        }
    }
    
    return (
        <>
            {error && <MessageBox mode = "error" content = {error}/>}    
            {isDeleting && loading && <MessageBox mode = "info" content = "Deleting the task..."/>}
            <ul className= {`tasks-list-container ${ListOfTasks.length == 0 && 'no-task'}`} >
                {ListOfTasks.map((task, index) => {
                    return (
                        <li key={index} className="tasks" 
                            data-id = {task.id}
                            data-title = {task.title}
                            data-description = {task.description}
                            data-status = {task.status}
                            data-priority = {task.priority}
                            data-due_date = {extractDate(task.due_date)}
                            data-due-time = {task.due_time}
                            >
                            <div className="task-content-container">
                                <div className="title">{task.title}</div>
                                <div className="description">
                                    {task.description}
                                </div>
                            </div>
                            <div className="properties-container">
                                <div
                                    className={`properties statuses ${classMapper.get(
                                        task.status
                                    )}`}
                                >
                                    {task.status}
                                </div>
                                
                                <div
                                    className={`properties priorities  ${classMapper.get(
                                        task.priority
                                    )}`}
                                >
                                    {task.priority}
                                </div>
                                
                            </div>
                            <div className="due-date">
                                Due Date: {task.due_date.split(" ").slice(1, 4).join(" / ")}
                            </div>
                            <div className="editing-btns-container">
                                <div className="edit-btns btns" onClick={()=>Edit(task.id)}>Edit</div>
                                <div className="delete-btns btns" onClick={()=>Delete(task.id)}>Del</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default TasksList;
