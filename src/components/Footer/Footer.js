import React from "react";
import TasksFilter from "../TasksFilter";


const Footer = ({showAll, showActive, showCompleted}) => {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
        <TasksFilter  showAll={showAll}
                      showActive={showActive}
                      showCompleted={showCompleted}
      />
      <button className="clear-completed">Clear Completed</button>
    </footer>
  )
}

export default Footer
