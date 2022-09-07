import React, {Component} from "react";
import NewTaskForm from "../NewTaskForm";
import Main from "../Main";
import './app.css'
// import params from './params'

export default class App extends Component {
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
    render() {
      return (
        <section className="todoapp">
          <NewTaskForm />
          <Main params={this.state.params}/>
        </section>
      )
    }
}
