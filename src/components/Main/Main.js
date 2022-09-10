import React from "react";
import Footer from "../Footer";
import TaskList from "../TaskList";

import Button from "../button";

const Main = ({params, onDelete}) => {
  return (
    <section className="main">
      <TaskList params={params} onDelete={onDelete}/>
      <Button />
      <Footer />
    </section>
  )
}

export default Main
