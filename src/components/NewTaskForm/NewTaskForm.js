import React from 'react'

const NewTaskForm = ({ onCreateTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (e.target.value.trim()) onCreateTask(e.target.value)
              e.target.value = ''
            }
          }}
        />
        <input className="new-todo-form__timer" placeholder="Min" autoFocus />
        <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
      </form>
    </header>
  )
}

export default NewTaskForm
