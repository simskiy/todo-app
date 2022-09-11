import React, {Component} from "react";
import Task from "../Task";
// { params, events}
export default class TaskList extends Component {

  render() {
    const {params, events} = this.props
    const taskArr = params.map(item => {
      const {id, status, hidden, ...opt} = item
      const inputEl = <input  type="text" autoFocus
                              className="edit"
                              defaultValue={opt.descriptionText}
                              onKeyDown={ (e) => {
                                if (e.key === 'Enter') events.onEditEnd(id, e.target.value)
                              }}
                              onBlur = { (e) => events.onEditEnd(id, e.target.value)}
                      />

      const inputElement = status ? inputEl : null

      return (
        <li key={id} className={ hidden ? 'hidden' : status}>
          <Task
            options={opt}
            onDelete={() => events.onDelete(id)}
            onEditStart={() => events.onEditStart(id)}
            onActive={() => events.onActive(id)}
            onCompleted = {() => events.onCompleted(id)}
            status={status}
          />
          {inputElement}
        </li>
      )
    })

    return (
      <ul className="todo-list">
        {taskArr}
      </ul>
    )
  }
}

// export default TaskList
