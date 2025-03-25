import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ManipulateTask from "../../components/Task Manipulation/Task_Manip";
import TasksList from "./components/TasksList/TasksList";
import "./Dashboard.css";
import { TasksContext } from "../../context/TasksContext";

const Dashboard = () => {
    const { theme } = useContext(ThemeContext);
    const { tasks } = useContext(TasksContext);
    const [taskLists, setTaskLists] = useState(null)

    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [editingValues, setEditingValues] = useState({});

    const [filterValues, setFilterValues] = useState({
        search: "",
        status: "all",
        priority: "all",
    });

    const Edit = (id) => {
        const elem = document.querySelector(`.tasks[data-id="${id}"]`);
        if (elem) {
            // elem.dataset.due_date = extractDate(elem.dataset.due_date);
            setEditingValues(elem.dataset);
            setIsUpdating(true);
            setIsAdding(false);
        } else {
            console.error("error: trying to edit non existing ");
        }
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && (isAdding || isUpdating)) {
            setIsAdding(false);
            setIsUpdating(false);
        }
    });

    const handleFiltersChange = (e) => {
        const {name, value} = e.target;

        let updatedFilterValues = { ...filterValues, [name]: value }
        updatedFilterValues.search = updatedFilterValues.search.toLowerCase();

        setFilterValues(updatedFilterValues);

        let filteredTasks = tasks.filter(task=>{
            return (updatedFilterValues.search === "" || task.title.toLowerCase().includes(updatedFilterValues.search) || task.description.toLowerCase().includes(updatedFilterValues.search)) &&
            (updatedFilterValues.status === "all" || task.status === updatedFilterValues.status) &&
            (updatedFilterValues.priority === "all" || task.priority === updatedFilterValues.priority)
        })

        setTaskLists(filteredTasks);
    };

    return (
        <main id="dashboard" className={theme}>
            <div className="contents-container">
                <section className="tasks-section">
                    <h1>Tasks</h1>
                    <TasksList taskLists = {taskLists} Edit={Edit} />
                </section>

                <section className="filters-section">
                    <div className="filters-container">
                        <div className="filter-group">
                            <input
                                type="search"
                                className="search"
                                name="search"
                                id="search"
                                placeholder="Search by title & desc.."
                                value = {filterValues.search}
                                onChange={handleFiltersChange}
                            />
                        </div>
                        <div className="filter-group">
                            <label htmlFor="status-filter">
                                Filter by status
                            </label>
                            <select
                                id="status-filter"
                                value= {filterValues.status}
                                name="status"
                                onChange={handleFiltersChange}
                            >
                                <option value="all">All</option>
                                <option value="Not started">Not Started</option>
                                <option value="In progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label htmlFor="priority-filter">
                                Filter by priority
                            </label>
                            <select
                                id="priority-filter"
                                value={filterValues.priority}
                                name="priority"
                                onChange={handleFiltersChange}
                            >
                                <option value="all">All</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>
                </section>

                {isAdding && (
                    <ManipulateTask
                        isAdding={isAdding}
                        setIsAdding={setIsAdding}
                        setIsUpdating={setIsUpdating}
                        editingValues={editingValues}
                    />
                )}
                {isUpdating && (
                    <ManipulateTask
                        isUpdating={isUpdating}
                        setIsAdding={setIsAdding}
                        setIsUpdating={setIsUpdating}
                        editingValues={editingValues}
                    />
                )}

                <div
                    id="add-task-btn"
                    className={isAdding || isUpdating ? "active" : ""}
                    title="Add Task"
                    onClick={() => {
                        if (isUpdating) {
                            setIsUpdating(false);
                        } else {
                            setIsAdding(!isAdding);
                        }
                        setEditingValues({});
                    }}
                >
                    +
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
