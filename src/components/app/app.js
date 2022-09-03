import React from "react";
import Header from "../header";
import Main from "../main";
import './app.css'

const App = () => {
    return (
    <React.StrictMode>
        <section className="todoapp">
            <Header />
            <Main />
        </section>
    </React.StrictMode>
    )
}

export default App

