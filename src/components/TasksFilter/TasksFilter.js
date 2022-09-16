import React, { Component } from 'react'

import BtnFilter from '../btnFilter/btnFilter'

export default class TasksFilter extends Component {
  state = {
    params: [
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
    ],
  }

  setFilter = (id) => {
    const newArr = [...this.state.params].map((item) => {
      item.selected = false
      return item
    })
    newArr[id].selected = true
    this.setState(() => {
      return {
        params: newArr,
      }
    })
  }

  render() {
    const { showFilterTasks } = this.props
    const filterArr = this.state.params.map((item) => {
      return (
        <li key={item.id}>
          <BtnFilter
            showFilterTasks={() => showFilterTasks(item.filterParam)}
            textBtn={item.text}
            selected={item.selected}
            setFilter={() => this.setFilter(item.id)}
          />
        </li>
      )
    })

    return <ul className="filters">{filterArr}</ul>
  }
}
