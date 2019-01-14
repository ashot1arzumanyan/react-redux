import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

class InputLabel extends Component {
  render() {

    const { common, warningMsgs, name, type, commonProps: { onInput, onBlur, onFocus, isBlurred, isInvalidMsg } } = this.props
    const contentName = 'contentName' in this.props ? this.props.contentName : name

    // const valid = isBlurred[name] && isInvalidMsg[name] === '' 
    // const invalid = isBlurred[name] && isInvalidMsg[name] !== ''

    return (
      <FormGroup className='jumperLabel'>
        <Label for={name}>{common[contentName]}</Label>
        <Input 
          id={name}
          type={type} 
          name={name}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          valid = { isBlurred[name] && isInvalidMsg[name] === '' }
          invalid = { isBlurred[name] && isInvalidMsg[name] !== '' }
          />
          <FormFeedback>{ warningMsgs[isInvalidMsg[name]] }</FormFeedback>               
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

export default connect(mapStateToProps)(InputLabel)