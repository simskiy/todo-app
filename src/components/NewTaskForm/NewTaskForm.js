import React, { Component } from 'react'
import { minutesToMilliseconds, secondsToMilliseconds } from 'date-fns'

export default class NewTaskForm extends Component {
  state = {
    text: '',
    minutes: '',
    seconds: '',
  }

  validateTime(value) {
    value = value.replace(/\D/g, '')
    if (value >= 59) value = 59
    return value
  }

  changeText = (event) => {
    this.setState({ text: event.target.value })
  }

  changeMinutes = (event) => {
    const minutes = this.validateTime(event.target.value)
    this.setState({ minutes })
  }

  changeSeconds = (event) => {
    const seconds = this.validateTime(event.target.value)
    this.setState({ seconds })
  }

  handleSumbit = (event) => {
    const miliseconds = minutesToMilliseconds(this.state.minutes) + secondsToMilliseconds(this.state.seconds)
    if (event.key === 'Enter') {
      this.props.onCreateTask(this.state.text, miliseconds)
      this.clearForm()
    }
  }

  clearForm = () => {
    this.setState({
      text: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onKeyDown={this.handleSumbit}>
          <input className="new-todo" placeholder="Task" autoFocus onChange={this.changeText} value={this.state.text} />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            value={this.state.minutes}
            onChange={this.changeMinutes}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            value={this.state.seconds}
            onChange={this.changeSeconds}
          />
        </form>
      </header>
    )
  }
}
