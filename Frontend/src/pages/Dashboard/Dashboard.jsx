import { useState } from "react";

import "./Dashboard.css";
import ManipulateTask from "../../components/Task Manipulation/Task_Manip";
import useTasks from "../../hooks/useTasks";
import TasksList from "./components/TasksList/TasksList";

const Dashboard = () => {
    const [isAdding, setIsAdding ] = useState(false);
    const [isUpdating, setIsUpdating ] = useState(false);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && (isAdding || isUpdating)) {
            setIsAdding(false);
            setIsUpdating(false);
        }
    });

    return (
        <main id="dashboard">
            <div className="contents-container">
            <section className="tasks-section">
                    <h1>Tasks</h1>
                    <TasksList/>

                </section>

                
                <section className="filters-section ">
                    <h1>Filters</h1>
                    {/* ! add the filters here  */}
                    
                </section>



                {isAdding && <ManipulateTask isAdding = {isAdding} setIsAdding= {setIsAdding}/>}
                {isUpdating && <ManipulateTask isUpdating = {isUpdating} setIsUpdating = {setIsUpdating}/>}

                <div
                    id="add-task-btn"
                    className={isAdding ? "active" : ""}
                    title="Add Task"
                    onClick={() => {
                        setIsAdding(!isAdding);
                        setIsUpdating(false);
                    }}
                >
                    +
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
