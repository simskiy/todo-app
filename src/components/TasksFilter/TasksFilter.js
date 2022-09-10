import React, {Component} from "react";

export default class TasksFilter extends Component {

  render() {
    const {showAll, showActive, showCompleted} = this.props

    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={showAll}>All</button>
        </li>
        <li>
          <button onClick={showActive}>Active</button>
        </li>
        <li>
          <button onClick={showCompleted}>Completed</button>
        </li>
      </ul>
    )
  }
}
