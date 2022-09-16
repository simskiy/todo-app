import React, { Component } from 'react'

import TasksFilter from '../TasksFilter/TasksFilter'

export default class Footer extends Component {
  static defaultProps = {
    leftItems: 1000,
  }

  static propTypes = {
    leftItems: (props, propName, componentName) => {
      const value = props[propName]
      if (typeof value === 'number' && !isNaN(value)) return null
      return new TypeError(`${componentName}: ${propName} must be number`)
    },
  }

  render() {
    const { showFilterTasks, leftItems, deleteCompleted } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{leftItems} items left</span>
        <TasksFilter showFilterTasks={showFilterTasks} />
        <button className="clear-completed" onClick={() => deleteCompleted()}>
          Clear Completed
        </button>
      </footer>
    )
  }
}
