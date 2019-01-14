import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, FormFeedback, ListGroup, ListGroupItem } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'
import DropdownInputWithJumperLabelFocus from '../../helpers/DropdownInputWithJumperLabelFocus'

class DropdownInputLabel extends Component {

  constructor(props) {
    super(props)
    this.list = []
    this.state = {
      list: [],
      isListOpen: false,
      isInputHasValue: false
    }

    this.onInputFilterList = this.onInputFilterList.bind(this)
    this.DropdownInputWithJumperLabelFocus = DropdownInputWithJumperLabelFocus.bind(this)
  }

  componentDidMount() {
    this.list = this.props.list
    this.setState({ list: this.list })
  }

  onInputFilterList(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    const nameS = `${name}s`
    const content = this.props.cFF[nameS]
    let execution = true
    let lowerCase = ''
    const matchedList = this.list.filter(m => {
      lowerCase = content[m].toLowerCase()
      if(execution && lowerCase === value) {
        execution = false
        this.props.commonProps.setNameValue(name, m)
      }
      return m.includes(value) || lowerCase.includes(value)
    })
    this.setState({
      list: matchedList
    })
  }
   
  render() {

    const { name, type, listName, commonProps: { onInput, onBlur, onClick, isBlurred, isInvalidMsg } } = this.props
    const { isListOpen, isInputHasValue } = this.state

    return (
      <FormGroup className='jumperLabel'>
        <Label 
          for={name}
          className={isInputHasValue ? 'jump' : 'jumpCancel'}>
          {this.props.common[name]}
        </Label>
        <Input 
          id={name}
          type={type}
          name={name}
          tabIndex='-1'
          autoComplete="off"
          onFocus={this.DropdownInputWithJumperLabelFocus}
          onInput={e => {
            onInput(e)
            this.onInputFilterList(e)
          }}
          onBlur={onBlur}
          valid = { isBlurred[name] && isInvalidMsg[name] === '' }
          invalid = { isBlurred[name] && isInvalidMsg[name] !== '' }
        />
        <FormFeedback>{ this.props.warningMsgs[isInvalidMsg[name]] }</FormFeedback>
        {isListOpen ? (
          <ListGroup className='select'>
            {this.state.list.map(listItem => 
              <ListGroupItem 
                key={listItem} 
                data-en={listItem}
                onClick={onClick}>
                {this.props.cFF[listName][listItem]}
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
    cFF: state.content.Filter,
    common: state.content.common,
    warningMsgs: state.content.warningMsgs
  }
}

export default connect(mapStateToProps)(DropdownInputLabel)