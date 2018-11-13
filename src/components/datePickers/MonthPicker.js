import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FormGroup, Label, Input, ListGroup, ListGroupItem, FormFeedback } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'

class MonthPicker extends Component {

  constructor(props) {
    super(props)
    this.list = []
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.list = moment().localeData().months()
    this.setState({ list: this.list })
  }

  onInputFilterList(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    let execution = true
    let lowerCase = ''
    const matchedList = this.list.filter((m, i) => {
      lowerCase = m.toLowerCase()
      if(execution && lowerCase === value || String(i + 1) === value) {
        execution = false
        this.props.commonProps.setNameValue(name, i + 1)
      }
      return String(i + 1) === value || lowerCase.includes(value)
    })
    this.setState({
      list: matchedList
    })
  }

  render() {
    const { common, commonProps: { onFocus, onBlur, onInput, onClick, isBlurred, isInvalidMsg } } = this.props

    return ( 
      <FormGroup className='jumperLabel mr-5'>
        <Label for='month'>{common.month}</Label>
        <Input 
          id='month'
          type="text" 
          name="month"
          onFocus={onFocus}
          onInput={e => {
              onInput(e)
              this.onInputFilterList(e)
            }
          }
          onBlur={onBlur}
          valid = { isBlurred.month && isInvalidMsg.month === '' }
          invalid = { isBlurred.month && isInvalidMsg.month !== '' }
        />
        <FormFeedback>{ isInvalidMsg.month }</FormFeedback>
        <ListGroup className='d-none select'>
          {this.state.list.map((month, i) => 
            <ListGroupItem 
              key={i} 
              data-en={i+1}
              onClick={onClick}>
              {month}
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