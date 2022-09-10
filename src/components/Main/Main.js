import React from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";


const Main = ({ params, ...events}) => {
  return (
    <section className="main">
      <TaskList params={params} events={events}/>
      <Footer />
    </section>
  )
}

export default Main
