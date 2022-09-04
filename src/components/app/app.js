import React from "react";
import NewTaskForm from "../NewTaskForm";
import Main from "../Main";
import './app.css'
import params from './params'

const App = () => {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <Main params={params}/>
      </section>
    )
}

export default App

