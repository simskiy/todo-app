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
    ]
  }

  createArr(text) {
    return {
      className: ACTIVE,
      descriptionText: text,
      createdText: 'created 5 minutes ago',
      id: this.idCount++
    }
  }

  editParams = (fn, id) => {
    const indItem = this.state.params.findIndex(item => item.id === id)
    let item = this.state.params.slice(indItem, indItem + 1)
    item = fn(...item)
    this.setState( ({params}) => {
      const newArr = item ? [...params.slice(0,indItem), item, ...params.slice(indItem + 1)]
                          : [...params.slice(0, indItem), ...params.slice(indItem + 1)];
        return {
          params: newArr
        }
    })
  }

  onCreateTask = (value) => {
    const newTask = this.createArr(value)
    this.setState(({params}) => {
      const newArr = [...params.slice(0), newTask]
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
      item.className = EDITING
      return item
    }, id)
  }

  onEditEnd = (id, value) => {
    if (value) {
      this.editParams((item) => {
        item.descriptionText = value
        item.className = ACTIVE
        return item
      }, id)
    } else {
      this.onDelete(id)
    }
  }

  onActive = (id) => {
    this.editParams((item) => {
      item.className = ACTIVE
      return item
    }, id)
  }

  onCompleted = (id) => {
    this.editParams((item) => {
      item.className = item.className ? ACTIVE : COMPLETED
      return item
    }, id)
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
        />
      </section>
    )
  }
}
