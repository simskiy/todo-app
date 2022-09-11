import React, {Component} from "react";

export default class Task extends Component {

  render () {
    const {options, onDelete, onEditStart, onCompleted} = this.props
    const {descriptionText, createdText} = options
    return(
      <div className="view">
        <input className="toggle"
              type="checkbox"
              onClick={onCompleted}
        />
        <label>
          <span className="description"
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
}

