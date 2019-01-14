import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, ListGroup, ListGroupItem, FormFeedback } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'
import DropdownInputWithJumperLabelFocus from '../../helpers/DropdownInputWithJumperLabelFocus'

class YearPicker extends Component {

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
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year < currentYear + 31; year++) {
      this.list.push(year)
    }
    this.setState({ list: this.list })
  }

  onInputFilterList(e) {
    const input = new InputWithJumperLabel(e)
    const value = input.getValue()
    const matchedList = this.list.filter((m) => {
      return String(m).includes(value)
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
          for='year'
          className={isInputHasValue ? 'jump' : 'jumpCancel'}>
          {common.year}
        </Label>
        <Input 
          id='year'
          type="text" 
          name="year"
          tabIndex='-1'
          autoComplete="off"
          onFocus={this.DropdownInputWithJumperLabelFocus}
          onInput={(e) => {
            onInput(e)
            this.onInputFilterList(e)
          }}
          onBlur={onBlur} 
          valid = { isBlurred.year && isInvalidMsg.year === '' }
          invalid = { isBlurred.year && isInvalidMsg.year !== '' }
        />
        <FormFeedback>{ warningMsgs[isInvalidMsg.year] }</FormFeedback>
        {isListOpen ? (
          <ListGroup className='select'>
            {this.state.list.map(year => 
              <ListGroupItem 
                key={year} 
                onClick={onClick}>
                {year}
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

export default connect(mapStateToProps)(YearPicker)