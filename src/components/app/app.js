import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Main from '../Main/Main'
import './app.css'

const ACTIVE = ''
const COMPLETED = 'completed'
const EDITING = 'editing'
let idCount = 1

const createArr = (text, timer) => {
  return {
    status: ACTIVE,
    hidden: false,
    descriptionText: text,
    isCompleted: false,
    createdText: Date.now(),
    id: idCount++,
    timer: timer || 0,
  }
}

const countLeftItems = (arr) => {
  return arr.reduce((newArr, cur) => {
    if (!cur.isCompleted) newArr.push(cur)
    return newArr
  }, []).length
}

const App = () => {
  const [params, setParams] = useState([createArr('task1', 0), createArr('task2', 0), createArr('task3', 0)])
  const [leftItems, setLeftItems] = useState(0)

  const editParams = (fn, id) => {
    const indItem = params.findIndex((item) => item.id === id)
    let item = params.slice(indItem, indItem + 1)
    item = fn(...item)
    const newArr = item
      ? [...params.slice(0, indItem), item, ...params.slice(indItem + 1)]
      : [...params.slice(0, indItem), ...params.slice(indItem + 1)]
    const items = countLeftItems(newArr)
    setParams(newArr)
    setLeftItems(items)
  }

  const onCreateTask = (value, timer) => {
    const newTask = createArr(value, timer)
    const newArr = [...params.slice(0), newTask]
    setParams(newArr)
    setLeftItems(newArr.length)
  }

  const onDelete = (id) => {
    editParams(() => null, id)
  }

  const onEditStart = (id) => {
    editParams((item) => {
      item.status = EDITING
      return item
    }, id)
  }

  const onEditEnd = (id, value) => {
    if (value) {
      editParams((item) => {
        item.descriptionText = value
        item.status = item.isCompleted ? COMPLETED : ACTIVE
        return item
      }, id)
    } else {
      onDelete(id)
    }
  }

  const onActive = (id) => {
    editParams((item) => {
      item.status = ACTIVE
      return item
    }, id)
  }

  const onCompleted = (id) => {
    editParams((item) => {
      if (item.status) {
        item.status = ACTIVE
        item.isCompleted = false
      } else {
        item.status = COMPLETED
        item.isCompleted = true
      }
      return item
    }, id)
  }

  const showFilterTasks = (value) => {
    const newArr = params.map((item) => {
      if (value === 'all') {
        item.hidden = false
        return item
      }
      item.status === value ? (item.hidden = false) : (item.hidden = true)
      return item
    })
    setParams(newArr)
  }

  const deleteCompleted = () => {
    const newArr = [...params].reduce((acc, cur) => {
      if (!cur.isCompleted) acc.push(cur)
      return acc
    }, [])
    setParams(newArr)
  }

  return (
    <section className="todoapp">
      <NewTaskForm onCreateTask={onCreateTask} />
      <Main
        params={params}
        onDelete={onDelete}
        onEditStart={onEditStart}
        onEditEnd={onEditEnd}
        onActive={onActive}
        onCompleted={onCompleted}
        showFilterTasks={showFilterTasks}
        leftItems={leftItems || params.length}
        deleteCompleted={deleteCompleted}
      />
    </section>
  )
}

export default App
