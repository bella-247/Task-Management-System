const Task = (
    {
      index,
      title = "No Title",
      description = "No description",
      status = "Not Started",
      isDone = false,
      priority = "medium",
      due_date = "No due date"
    }) =>{
  

    return (
        <li key={index} className="tasks">
            <div className='task-title'>{title}</div>
            <div className="description">{description}</div>
        </li>
    )
  
  }

  export default Task;