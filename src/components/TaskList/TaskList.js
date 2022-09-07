import React from "react";
import Task from "../Task";

const TaskList = ({params}) => {
  const taskArr = params.map(item => {
    const {id, className, ...opt} = item
    const inputElement = className ? <input type="text" className="edit" defaultValue={"Editing task"} /> : null
    return (
      <li key={id} className={className}>
        <Task
          options={opt}
        />
        {inputElement}
      </li>
    )
  })

  return (
    <ul className="todo-list">
      {taskArr}
    </ul>
  )
}

export default TaskList
