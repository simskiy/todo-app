import React from "react";
import TodoListItem from "../todo-list-item/todo-list-item";
import params from "./params";

const TodoList = () => {
  return (
    <ul className="todo-list">
      <TodoListItem options={params.completed}/>
      <TodoListItem options={params.editing} />
      <TodoListItem options={params.active} />
    </ul>
  )
}

export default TodoList
