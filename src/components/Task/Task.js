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
    play: false,
  }

  componentDidMount() {
    this.passedTime = setInterval(() => this.updateTimer(), 1000)
    this.setState({
      convertTimer: this.convertTimer(this.state.timer),
    })
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

  convertTimer(mls) {
    //  const milliseconds = this.state.timer
    let minutes = millisecondsToMinutes(mls)
    let seconds = millisecondsToSeconds(mls - minutesToMilliseconds(minutes))
    seconds = seconds < 10 ? `0${seconds}` : seconds
    minutes = minutes < 10 ? `0${minutes}` : minutes
    return `${minutes}:${seconds}`
  }

  tickTimer() {
    let newTimer = this.state.timer + 1000
    this.setState({
      timer: newTimer,
      convertTimer: this.convertTimer(newTimer),
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
