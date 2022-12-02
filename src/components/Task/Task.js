import React, { useState, useEffect } from 'react'
import {
  formatDistanceToNowStrict,
  millisecondsToMinutes,
  millisecondsToSeconds,
  minutesToMilliseconds,
} from 'date-fns'

const fnConvertTimer = (mls) => {
  let minutes = millisecondsToMinutes(mls)
  let seconds = millisecondsToSeconds(mls - minutesToMilliseconds(minutes))
  seconds = seconds < 10 ? `0${seconds}` : seconds
  minutes = minutes < 10 ? `0${minutes}` : minutes
  return `${minutes}:${seconds}`
}

let hndCreatedTime = null
let hndRunTime = null

const Task = (props) => {
  const { options, onDelete, onEditStart, onCompleted } = props
  const { descriptionText, createdText, timer } = options

  const [createdTime, setCreatedTime] = useState(createdText)
  const [runTime, setRunTime] = useState(timer)
  const [isTick, setIsTick] = useState(false)

  useEffect(() => {
    hndCreatedTime = setInterval(() => setCreatedTime(formatDistanceToNowStrict(createdTime)), 1000)
    return () => {
      clearInterval(hndCreatedTime)
    }
  }, [])

  const startTimer = (isRun) => {
    if (isRun) {
      setIsTick(true)
      hndRunTime = setInterval(() => setRunTime((runTime) => runTime + 1000), 1000)
    } else {
      clearInterval(hndRunTime)
      setIsTick(false)
    }
  }

  return (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onCompleted} />
      <label>
        <span className="title">{descriptionText}</span>
        <span className="description">
          <button className="icon icon-play" disabled={isTick} onClick={() => startTimer(true)}></button>
          <button className="icon icon-pause" disabled={!isTick} onClick={() => startTimer(false)}></button>
          {fnConvertTimer(runTime)}
        </span>
        <span className="description"> created {createdTime} ago</span>
      </label>
      <button className="icon icon-edit" onClick={onEditStart} />
      <button className="icon icon-destroy" onClick={onDelete} />
    </div>
  )
}

export default Task
