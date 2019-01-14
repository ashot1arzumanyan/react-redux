import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'
import moment from 'moment'

import DropdownInputWithJumperLabelFocus from '../../helpers/DropdownInputWithJumperLabelFocus'

class MonthPicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lastDay: 31,
      isListOpen: false,
      isInputHasValue: false
    }

    this.DropdownInputWithJumperLabelFocus = DropdownInputWithJumperLabelFocus.bind(this)
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

    const { common, onBlur, onInput, onClick } = this.props
    const days = this.generateDays(this.state.lastDay)
    const { isListOpen, isInputHasValue } = this.state

    return ( 
      <FormGroup className='jumperLabel'>
        <Label 
          for='day'
          className={isInputHasValue ? 'jump' : 'jumpCancel'}>
          {common.day}
        </Label>
        <Input 
          id='day'
          type="text" 
          name="day"
          tabIndex='-1'
          autoComplete="off"
          onFocus={this.DropdownInputWithJumperLabelFocus}
          onInput={onInput}
          onBlur={onBlur}
        />
        {isListOpen ? (
          <ListGroup className='select'>
            {days.map(day => 
              <ListGroupItem 
                key={day} 
                onClick={onClick}>
                {day}
              </ListGroupItem>
            )}
          </ListGroup>
        ) : (null)}
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