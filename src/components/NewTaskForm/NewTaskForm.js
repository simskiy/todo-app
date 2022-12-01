import React, { useState } from 'react'
import { minutesToMilliseconds, secondsToMilliseconds } from 'date-fns'

const initialValue = {
  text: '',
  minutes: '',
  seconds: '',
}

const NewTaskForm = ({ onCreateTask }) => {
  const [task, setTask] = useState(initialValue)

  const handleSumbit = (event) => {
    const miliseconds = minutesToMilliseconds(task.minutes) + secondsToMilliseconds(task.seconds)
    if (event.key === 'Enter') {
      onCreateTask(task.text, miliseconds)
      clearForm()
    }
  }

  const validateTime = (value) => {
    value = value.replace(/\D/g, '')
    if (value >= 59) value = 59
    return value
  }

  const changeText = (event) => {
    const text = event.target.value
    setTask({ ...task, ...{ text } })
  }

  const changeMinutes = (event) => {
    const minutes = validateTime(event.target.value)
    setTask({ ...task, ...{ minutes } })
  }

  const changeSeconds = (event) => {
    const seconds = validateTime(event.target.value)
    setTask({ ...task, ...{ seconds } })
  }

  const clearForm = () => {
    setTask(initialValue)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onKeyDown={handleSumbit}>
        <input className="new-todo" placeholder="Task" autoFocus onChange={changeText} value={task.text} />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          value={task.minutes}
          onChange={changeMinutes}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={task.seconds}
          onChange={changeSeconds}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
