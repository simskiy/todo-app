import React from "react";
import Task from "../Task";

const TaskList = ({params}) => {
  return (
    <ul className="todo-list">
      <Task options={params.completed}/>
      <Task options={params.editing} />
      <Task options={params.active} />
    </ul>
  )
}

export default TaskList
