import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, ListGroup, ListGroupItem, FormFeedback } from 'reactstrap'

import DropdownInputWithJumperLabelFocus from '../../helpers/DropdownInputWithJumperLabelFocus'

class ContinuousDatePicker extends Component {

  constructor(props) {
    super(props)
    this.frequencyNums = []
    this.state = {
      lastNumber: 6,
      isListOpen: false,
      isInputHasValue: false
    }

    this.DropdownInputWithJumperLabelFocus = DropdownInputWithJumperLabelFocus.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let lastNumber = 6;
    const value = nextProps.continuousType;
    if (value === 'week') {
      lastNumber = 3
    } else if (value === 'month') {
      lastNumber = 12
    }
    this.setState({
      lastNumber: lastNumber
    })
  }

  generateFrequencyNums(lastNumber) {
    let frequencyNums = [];
    for (let d = 1; d <= lastNumber; d++) {
      frequencyNums.push(d)
    }
    return frequencyNums;
  }

  render() {
    
    const { common, warningMsgs, onClickOnRadioContinuousType, continuousType, commonProps: { onBlur, onInput, onClick, isBlurred, isInvalidMsg } } = this.props
    const { isListOpen, isInputHasValue, lastNumber } = this.state
    const frequencyNums = this.generateFrequencyNums(lastNumber)

    return ( 
      <React.Fragment>
        <FormGroup className='d-flex'>
          <FormGroup check className='mr-5'>
            <Label check>
              <Input 
                type='radio'
                name='continuous'
                value='day'
                defaultChecked='true'
                onClick={onClickOnRadioContinuousType}
              />
              {common.day}
            </Label>
          </FormGroup>
          <FormGroup check className='mr-5'>
            <Label check>
              <Input 
                type='radio'
                name='continuous'
                value='week'
                onClick={onClickOnRadioContinuousType}
              />   
              {common.week}
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input 
                type='radio'
                name='continuous'
                value='month'
                onClick={onClickOnRadioContinuousType}
              />   
              {common.month}
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup className='jumperLabel' style={{maxWidth: '30%'}}>
          <Label 
            for='frequencyNum'
            className={isInputHasValue ? 'jump' : 'jumpCancel'}>
            {common[continuousType]}
          </Label>
          <Input 
            id='frequencyNum'
            type="text" 
            name="frequencyNum"
            tabIndex='-1'
            autoComplete="off"
            onFocus={this.DropdownInputWithJumperLabelFocus}
            onInput={onInput}
            onBlur={onBlur}
            valid = { isBlurred.frequencyNum && isInvalidMsg.frequencyNum === '' }
            invalid = { isBlurred.frequencyNum && isInvalidMsg.frequencyNum !== '' }
          />
          <FormFeedback>{ warningMsgs[isInvalidMsg.frequencyNum] }</FormFeedback>
          {isListOpen ? (
            <ListGroup className='select'>
              {frequencyNums.map(frequencyNum => 
                <ListGroupItem 
                  key={frequencyNum} 
                  onClick={onClick}>
                  {frequencyNum}
                </ListGroupItem>
              )}
            </ListGroup>
          ) : (null)}
        </FormGroup>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.content.common,
    warningMsgs: state.content.warningMsgs
  }
}

export default connect(mapStateToProps)(ContinuousDatePicker)