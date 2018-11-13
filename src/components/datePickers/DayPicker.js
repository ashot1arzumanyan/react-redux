import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import moment from 'moment'

class MonthPicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lastDay: 31
    }
  }

  componentWillReceiveProps(nextProps) {
    const { year, month } = nextProps;
    if (year && month) {
      const lastDay = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
      this.setState({ lastDay: lastDay })
    }
  }

  generateDays(lastDay) {
    let days = [];
    for (let day = 1; day <= lastDay; day++) {
      days.push(day)
    }
    return days;
  }

  render() {

    const { common, commonProps: { onFocus, onBlur, onInput, onClick } } = this.props
    const days = this.generateDays(this.state.lastDay)
    
    return ( 
      <FormGroup className='jumperLabel'>
        <Label for='day'>{common.day}</Label>
        <Input 
          id='day'
          type="text" 
          name="day"
          onFocus={onFocus}
          onInput={onInput}
          onBlur={onBlur}
          // valid = { isBlurred.unit && isInvalidMsg.unit === '' }
          // invalid = { isBlurred.unit && isInvalidMsg.unit !== '' }
        />
        {/* <FormFeedback>{ isInvalidMsg.unit }</FormFeedback> */}
        <ListGroup className='d-none select'>
          {days.map(day => 
            <ListGroupItem 
              key={day} 
              onClick={onClick}>
              {day}
            </ListGroupItem>
          )}
        </ListGroup>
      </FormGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.content.common,
  }
}

export default connect(mapStateToProps)(MonthPicker)