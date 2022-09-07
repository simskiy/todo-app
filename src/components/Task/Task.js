import React from "react";

const Task = ({options}) => {
  const {descriptionText, createdText} = options
  return(



    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{descriptionText}</span>
        <span className="created">{createdText}</span>
      </label>
      <button className="icon icon-edit" />
      <button className="icon icon-destroy" />
    </div>
  )
}

export default Task
