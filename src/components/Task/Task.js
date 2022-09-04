import React from "react";

const Task = ({options}) => {
  let inputEdit = null
  if (options.isInputEdit) inputEdit = <input type="text" className="edit" defaultValue={"Editing task"} />
  return(
    <li  className={options.className}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{options.descriptionText}</span>
          <span className="created">{options.createdText}</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" />
      </div>
      {inputEdit}
    </li>
  )
}

export default Task
