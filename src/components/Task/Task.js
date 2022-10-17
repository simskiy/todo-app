import React, { Component } from 'react'
import {
  formatDistanceToNowStrict,
  millisecondsToMinutes,
  millisecondsToSeconds,
  minutesToMilliseconds,
} from 'date-fns'

export default class Task extends Component {
  state = {
    createdTime: formatDistanceToNowStrict(this.props.options.createdText),
    timer: this.props.options.timer,
    convertTimer: null,
    play: true,
  }

  componentDidMount() {
    this.passedTime = setInterval(() => this.updateTimer(), 1000)
    this.runTimer = setInterval(() => this.tickTimer(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.passedTime)
    clearInterval(this.runTimer)
  }

  componentDidUpdate(prevProps) {
    const prev = prevProps.options.isCompleted
    const curr = this.props.options.isCompleted
    if (prev !== curr) {
      if (curr) {
        this.stopTimer()
      } else {
        this.startTimer()
      }
    }
  }

  updateTimer() {
    this.setState({
      createdTime: formatDistanceToNowStrict(this.props.options.createdText),
    })
  }

  startTimer = () => {
    if (!this.state.play) {
      this.runTimer = setInterval(() => this.tickTimer(), 1000)
      this.setState({ play: true })
    }
  }

  tickTimer() {
    const milliseconds = this.state.timer
    const minutes = millisecondsToMinutes(milliseconds)
    const seconds = millisecondsToSeconds(milliseconds - minutesToMilliseconds(minutes))
    let newTimer = milliseconds
    newTimer = milliseconds + 1000
    const newConverTimer = `${minutes}:${seconds}`
    this.setState({
      timer: newTimer,
      convertTimer: newConverTimer,
    })
  }

  stopTimer = () => {
    if (this.state.play) {
      clearInterval(this.runTimer)
      this.setState({ play: false })
    }
  }

  render() {
    const { options, onDelete, onEditStart, onCompleted } = this.props
    const { descriptionText } = options
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCompleted} />
        <label>
          <span className="title">{descriptionText}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => this.startTimer()}></button>
            <button className="icon icon-pause" onClick={() => this.stopTimer()}></button>
            {this.state.convertTimer}
          </span>
          <span className="description"> created {this.state.createdTime} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditStart} />
        <button className="icon icon-destroy" onClick={onDelete} />
      </div>
    )
  }
}
