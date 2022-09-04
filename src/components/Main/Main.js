import React from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";

const Main = ({params}) => {

  return (
    <section className="main">
      <TaskList params={params}/>
      <Footer />
    </section>
  )
}

export default Main
