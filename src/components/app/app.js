import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Main from '../Main/Main'
import './app.css'

const ACTIVE = ''
const COMPLETED = 'completed'
const EDITING = 'editing'
export default class App extends Component {
  idCount = 1
  state = {
    params: [
      this.createArr('Выгулить кота'),
      this.createArr('Забыть кота на улице'),
      this.createArr('Прокрастинировать'),
      this.createArr('Найти кота'),
    ],
    leftItems: 0,
  }

  createArr(text) {
    return {
      status: ACTIVE,
      hidden: false,
      descriptionText: text,
      isCompleted: false,
      createdText: Date.now(),
      id: this.idCount++,
    }
  }

  editParams = (fn, id) => {
    const indItem = this.state.params.findIndex((item) => item.id === id)
    let item = this.state.params.slice(indItem, indItem + 1)
    item = fn(...item)
    this.setState(({ params }) => {
      const newArr = item
        ? [...params.slice(0, indItem), item, ...params.slice(indItem + 1)]
        : [...params.slice(0, indItem), ...params.slice(indItem + 1)]
      const items = this.countLeftItems(newArr)
      return {
        params: newArr,
        leftItems: items,
      }
    })
  }

  onCreateTask = (value) => {
    const newTask = this.createArr(value)
    const newArr = [...this.state.params.slice(0), newTask]
    this.setState(() => {
      return {
        params: newArr,
        leftItems: newArr.length,
      }
    })
  }

  onDelete = (id) => {
    this.editParams(() => null, id)
  }

  onEditStart = (id) => {
    this.editParams((item) => {
      item.status = EDITING
      return item
    }, id)
  }

  onEditEnd = (id, value) => {
    if (value) {
      this.editParams((item) => {
        item.descriptionText = value
        item.status = item.isCompleted ? COMPLETED : ACTIVE
        return item
      }, id)
    } else {
      this.onDelete(id)
    }
  }

  onActive = (id) => {
    this.editParams((item) => {
      item.status = ACTIVE
      return item
    }, id)
  }

  onCompleted = (id) => {
    this.editParams((item) => {
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

  showFilterTasks = (value) => {
    const newArr = this.state.params.map((item) => {
      if (value === 'all') {
        item.hidden = false
        return item
      }
      item.status === value ? (item.hidden = false) : (item.hidden = true)
      return item
    })
    this.setState(() => {
      return {
        params: newArr,
      }
    })
  }

  countLeftItems = (arr) => {
    return arr.reduce((newArr, cur) => {
      if (!cur.isCompleted) newArr.push(cur)
      return newArr
    }, []).length
  }

  deleteCompleted = () => {
    const newArr = [...this.state.params].reduce((acc, cur) => {
      if (!cur.isCompleted) acc.push(cur)
      return acc
    }, [])
    this.setState(() => {
      return {
        params: newArr,
      }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm onCreateTask={this.onCreateTask} />
        <Main
          params={this.state.params}
          onDelete={this.onDelete}
          onEditStart={this.onEditStart}
          onEditEnd={this.onEditEnd}
          onActive={this.onActive}
          onCompleted={this.onCompleted}
          showFilterTasks={this.showFilterTasks}
          leftItems={this.state.leftItems || this.state.params.length}
          deleteCompleted={this.deleteCompleted}
        />
      </section>
    )
  }
}
