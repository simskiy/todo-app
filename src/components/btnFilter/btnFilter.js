import React from "react";

const BtnFilter = ({showFilterTasks, textBtn, selected, setFilter}) => {
  return <button className={selected?'selected':null}
                 onClick={() => {
                  showFilterTasks()
                  setFilter()
                 }}
         >{textBtn}</button>

}

export default BtnFilter
