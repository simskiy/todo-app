import React, {Component} from "react";
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {

  render () {
    const {options, onDelete, onEditStart, onCompleted} = this.props
    const {descriptionText, createdText} = options
    const date = formatDistanceToNow(createdText)
    return(
      <div className="view">
        <input className="toggle"
              type="checkbox"
              onClick={onCompleted}
        />
        <label>
          <span className="description"
          >{descriptionText}</span>
          <span className="created">{date} ago</span>
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

