import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FormGroup, Label, Input, FormFeedback, ListGroup, ListGroupItem } from 'reactstrap'

import DropdownInputWithJumperLabelFocus from '../../helpers/DropdownInputWithJumperLabelFocus'

class DropdownInputLabelChildList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false,
      isInputHasValue: false
    }

    this.DropdownInputWithJumperLabelFocus = DropdownInputWithJumperLabelFocus.bind(this)
  }

  render() {
    
    const { common, warningMsgs, cFF, name, list, type, listName, match, onInput, onBlur, onClick, isBlurred, isInvalidMsg } = this.props
    const { isListOpen, isInputHasValue } = this.state

    return (
      <FormGroup className='jumperLabel'>
        <Label 
          for={name} 
          className={isInputHasValue ? 'jump' : 'jumpCancel'}>
          {common[name]}
        </Label>
        <Input 
          id={name}
          type={type} 
          name={name}
          tabIndex='-1'
          autoComplete="off"
          onFocus={this.DropdownInputWithJumperLabelFocus}
          onInput={onInput}
          onBlur={e => {
            if (!this.state.isListOpen) {
              onBlur(e)
            }
          }}
          valid = { isBlurred[name] && isInvalidMsg[name] === '' }
          invalid = { isBlurred[name] && isInvalidMsg[name] !== '' }
        />
        <FormFeedback>{ warningMsgs[isInvalidMsg[name]] }</FormFeedback>
        {isListOpen ? (
          <ListGroup className='select'>
            {list.map(listItem => 
              <ListGroupItem 
                key={listItem[name]} 
                className="d-flex justify-content-between"
                data-en={listItem[name]}
                data-match={listItem[match]}
                onClick={onClick}>
                {cFF[listName][listItem[name]]}
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
    cFF: state.content.Filter,
    warningMsgs: state.content.warningMsgs 
  }
}

export default connect(mapStateToProps)(DropdownInputLabelChildList)