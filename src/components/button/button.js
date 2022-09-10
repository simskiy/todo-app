import React from "react";
import './button.css'

const Button = () => {
  return (
    <button
      className="btn"
      onClick={() => {console.log('hello')}}
    >Push me</button>
  )
}

export default Button
