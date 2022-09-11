import React, {Component} from "react";
import NewTaskForm from "../NewTaskForm";
import Main from "../Main";
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
      this.createArr('Найти кота')
    ],
    leftItems: 0
  }

  createArr(text) {
    return {
      status: ACTIVE,
      hidden: false,
      descriptionText: text,
      isCompleted: false,
      createdText: 'created 5 minutes ago',
      id: this.idCount++
    }
  }

  editParams = (fn, id) => {
    const indItem = this.state.params.findIndex(item => item.id === id)
    let item = this.state.params.slice(indItem, indItem + 1)
    item = fn(...item)
    const newArr = item ? [...this.state.params.slice(0,indItem), item, ...this.state.params.slice(indItem + 1)]
                          : [...this.state.params.slice(0, indItem), ...this.state.params.slice(indItem + 1)];
    this.countLeftItems(newArr)
    this.setState( () => {
        return {
          params: newArr
        }
    })
  }

  onCreateTask = (value) => {
    const newTask = this.createArr(value)
    const newArr = [...this.state.params.slice(0), newTask]
    this.countLeftItems(newArr)
    this.setState(() => {
      return {
        params: newArr
      }
    })
  }

  onDelete = (id) => {
    this.editParams( () => null, id)
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
        this.countLeftItems(this.state.params)
      } else {
        item.status = COMPLETED
        item.isCompleted = true
        this.countLeftItems(this.state.params)
      }
      return item
    }, id)
  }

  showFilterTasks = (value) => {
    const newArr = this.state.params.map(item => {
      if (value === 'all') { item.hidden=false; return item }
      item.status === value ? item.hidden = false : item.hidden = true
      return item
    })
    this.setState( () => {
      return {
        params: newArr
      }
    })
  }

  countLeftItems (arr) {
    const completedItems = this.state.params.reduce( (newArr, cur) => {
      if (cur.isCompleted) newArr.push(cur)
      return newArr
    }, []).length
    this.setState(() => {
      return {
        leftItems: arr.length - completedItems
      }
    })
  }

  deleteCompleted = () => {
    const newArr = [...this.state.params].reduce( (acc, cur) => {
      if (!cur.isCompleted) acc.push(cur)
      return acc
    }, [])
    this.setState(() => {
      return {
        params: newArr
      }
    })
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm onCreateTask = {this.onCreateTask}/>
        <Main
          params={this.state.params}
          onDelete = {this.onDelete}
          onEditStart = {this.onEditStart}
          onEditEnd = {this.onEditEnd}
          onActive = {this.onActive}
          onCompleted = {this.onCompleted}
          showFilterTasks = {this.showFilterTasks}
          leftItems={this.state.leftItems || this.state.params.length}
          deleteCompleted={this.deleteCompleted}
        />
      </section>
    )
  }
}
