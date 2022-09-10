import React from "react";

const Task = ({ options,
                onDelete,
                onEditStart,
                onCompleted}) => {
  const {descriptionText, createdText} = options
  return(
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description"
          onClick={onCompleted}
        >{descriptionText}</span>
        <span className="created">{createdText}</span>
      </label>
      <button
        className="icon icon-edit"
        onClick={onEditStart}
      />
      <button
        className="icon icon-destroy"
        onClick={onDelete}
      />
    </div>
  )
}

export default Task
