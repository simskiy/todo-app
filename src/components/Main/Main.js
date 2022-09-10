import React from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";


const Main = ({ params, showAll, showActive, showCompleted, ...events}) => {
  return (
    <section className="main">
      <TaskList params={params} events={events}/>
      <Footer showAll={showAll} 
              showActive={showActive}
              showCompleted={showCompleted}
      />
    </section>
  )
}

export default Main
