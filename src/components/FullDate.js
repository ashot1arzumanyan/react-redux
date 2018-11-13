import React, { Component } from 'react'
import moment from 'moment'

class FullDate extends Component {
  
  render() {

    const date = this.props.date
    const dateStr = moment(date).format('DD MMMM YYYY')
    return (
      <span>
        { dateStr }
      </span>
    )
  }
}

export default FullDate