import React, { useState } from 'react'

import BtnFilter from '../btnFilter/btnFilter'

const TasksFilter = (props) => {
  const [params, setParams] = useState([
    {
      text: 'All',
      filterParam: 'all',
      selected: true,
      id: 0,
    },
    {
      text: 'Active',
      filterParam: '',
      selected: false,
      id: 1,
    },
    {
      text: 'Completed',
      filterParam: 'completed',
      selected: false,
      id: 2,
    },
  ])

  const setFilter = (id) => {
    const newArr = [...params].map((item) => {
      item.selected = false
      return item
    })
    newArr[id].selected = true
    setParams(newArr)
  }

  const { showFilterTasks } = props
  const filterArr = params.map((item) => {
    return (
      <li key={item.id}>
        <BtnFilter
          showFilterTasks={() => showFilterTasks(item.filterParam)}
          textBtn={item.text}
          selected={item.selected}
          setFilter={() => setFilter(item.id)}
        />
      </li>
    )
  })

  return <ul className="filters">{filterArr}</ul>
}

export default TasksFilter
