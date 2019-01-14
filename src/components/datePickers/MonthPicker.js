import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { FormGroup, Label, Input, ListGroup, ListGroupItem, FormFeedback } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'
import DropdownInputWithJumperLabelFocus from '../../helpers/DropdownInputWithJumperLabelFocus'

class MonthPicker extends Component {

  constructor(props) {
    super(props)
    this.list = []
    this.state = {
      list: [],
      isListOpen: false,
      isInputHasValue: false
    }

    this.DropdownInputWithJumperLabelFocus = DropdownInputWithJumperLabelFocus.bind(this)
  }

  componentDidMount() {
    this.list = moment().localeData().months()
    this.setState({ list: this.list })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.year === new Date().getFullYear().toString()) {
      this.setState({
        list: this.list.slice(new Date().getMonth())
      })
    } else {
      if (this.state.list.length < 12) {
        this.setState({ list: this.list })
      }
    }
  }

  onInputFilterList(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    let execution = true
    let lowerCase = ''
    const matchedList = this.list.filter((m, i) => {
      lowerCase = m.toLowerCase()
      if(execution && (lowerCase === value || String(i + 1) === value)) {
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
    const { common, warningMsgs, commonProps: { onBlur, onInput, onClick, isBlurred, isInvalidMsg } } = this.props
    const { isListOpen, isInputHasValue } = this.state

    return ( 
      <FormGroup className='jumperLabel mr-5'>
        <Label 
          for='month'
          className={isInputHasValue ? 'jump' : 'jumpCancel'}>
          {common.month}
        </Label>
        <Input 
          id='month'
          type="text" 
          name="month"
          tabIndex='-1'
          autoComplete="off"
          onFocus={this.DropdownInputWithJumperLabelFocus}
          onInput={e => {
              onInput(e)
              this.onInputFilterList(e)
            }
          }
          onBlur={onBlur}
          valid = { isBlurred.month && isInvalidMsg.month === '' }
          invalid = { isBlurred.month && isInvalidMsg.month !== '' }
        />
        <FormFeedback>{ warningMsgs[isInvalidMsg.month] }</FormFeedback>
        {isListOpen ? (
          <ListGroup className='select'>
            {this.state.list.map((month, i) => 
              <ListGroupItem 
                key={i} 
                data-en={i+1}
                onClick={onClick}>
                {month}
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
    warningMsgs: state.content.warningMsgs
  }
}

export default connect(mapStateToProps)(MonthPicker)