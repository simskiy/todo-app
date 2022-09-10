import React from "react";
import Task from "../Task";

const TaskList = ({ params, events}) => {

  const taskArr = params.map(item => {
    const {id, className, ...opt} = item
    const inputEl = <input  type="text" autoFocus
                            className="edit"
                            defaultValue={opt.descriptionText}
                            onKeyDown={ (e) => {
                              if (e.key === 'Enter') events.onEditEnd(id, e.target.value)
                            }}
                            onBlur = { (e) => events.onEditEnd(id, e.target.value)}
                    />

    const inputElement = className ? inputEl : null

    return (
      <li key={id} className={className}>
        <Task
          options={opt}
          onDelete={() => events.onDelete(id)}
          onEditStart={() => events.onEditStart(id)}
          onActive={() => events.onActive(id)}
          onCompleted = {() => events.onCompleted(id)}
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
