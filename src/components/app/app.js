import React, {Component} from "react";
import NewTaskForm from "../NewTaskForm";
import Main from "../Main";
import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    params: [
      {
        className: "completed",
        descriptionText: 'Completed task',
        createdText: 'created 17 seconds',
        id: 1
      },
      {
        className: 'editing',
        descriptionText: 'Editing task',
        createdText: 'created 5 minutes ago',
        id: 2
      },
      {
        type: null,
        descriptionText: 'Active task',
        createdText: 'created 5 minutes ago',
        id: 3
      }
    ]
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

  onDelete = (id) => {
    // this.editParams( (item) => {
    //   item.descriptionText = 'Hello'
    //   return item
    // }, id)
    this.editParams( () => null, id)
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <Main
          params={this.state.params}
          onDelete = {this.onDelete}
        />
      </section>
    )
  }
}
