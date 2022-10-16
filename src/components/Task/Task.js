import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  render() {
    const { options, onDelete, onEditStart, onCompleted } = this.props
    const { descriptionText, createdText } = options
    const date = formatDistanceToNow(createdText)
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCompleted} />
        <label>
          <span className="title">{descriptionText}</span>
          <span className="description">
            <button className="icon icon-play"></button>
            <button className="icon icon-pause"></button>
            12:25
          </span>
          <span className="description"> {date} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditStart} />
        <button className="icon icon-destroy" onClick={onDelete} />
      </div>
    )
  }
}

/*
<label>
  <span class="title">fw</span>
  <span class="description">
    <button class="icon icon-play"></button>
    <button class="icon icon-pause"></button>
    12:25
  </span>
  <span class="description">created 17 seconds ago</span>
</label>
*/
