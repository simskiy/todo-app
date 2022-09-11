import React from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";


const Main = ({ params, showFilterTasks, leftItems, deleteCompleted, ...events}) => {
  return (
    <section className="main">
      <TaskList params={params} events={events}/>
      <Footer showFilterTasks={showFilterTasks}
              leftItems={leftItems}
              deleteCompleted={deleteCompleted}
      />
    </section>
  )
}

export default Main
