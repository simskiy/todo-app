import React from "react";

const NewTaskForm =({onCreateTask}) => {

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' ) {
            if (e.target.value.trim()) onCreateTask(e.target.value)
            e.target.value = ''
          }
        }}
      />
    </header>
  )
}

export default NewTaskForm
