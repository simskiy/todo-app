import React from 'react'

import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = (props) => {
  const { showFilterTasks, leftItems, deleteCompleted } = props

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

Footer.propTypes = {
  leftItems: (props, propName, componentName) => {
    const value = props[propName]
    if (typeof value === 'number' && !isNaN(value)) return null
    return new TypeError(`${componentName}: ${propName} must be number`)
  },
}

export default Footer
