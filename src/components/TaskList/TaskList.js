import React from 'react'

import Task from '../Task/Task'

const createList = (items, events) => {
  return items.map((item) => {
    const { id, status, hidden, ...opt } = item

    const inputEl = (
      <input
        type="text"
        autoFocus
        className="edit"
        defaultValue={opt.descriptionText}
        onKeyDown={(e) => {
          if (e.key === 'Enter') events.onEditEnd(id, e.target.value)
        }}
        onBlur={(e) => events.onEditEnd(id, e.target.value)}
      />
    )

    return (
      <li key={id} className={hidden ? 'hidden' : status}>
        <Task
          options={opt}
          onDelete={() => events.onDelete(id)}
          onEditStart={() => events.onEditStart(id)}
          onActive={() => events.onActive(id)}
          onCompleted={() => events.onCompleted(id)}
          status={status}
        />
        {status ? inputEl : null}
      </li>
    )
  })
}

const TaskList = (props) => {
  const { params, events } = props
  return <ul className="todo-list">{createList(params, events)}</ul>
}

export default TaskList
