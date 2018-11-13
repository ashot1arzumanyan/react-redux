import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, FormFeedback, ListGroup, ListGroupItem } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'

class DropdownInputLabel extends Component {

  constructor(props) {
    super(props)
    this.list = []
    this.state = {
      list: []
    }

    this.onInputFilterList = this.onInputFilterList.bind(this)
  }

  componentDidMount() {
    this.list = this.props.list
    this.setState({ list: this.list })
  }

  onInputFilterList(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    const nameS = `${name}s`
    const content = this.props.common[nameS]
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

    const { common, name, type, listName, commonProps: { onInput, onBlur, onFocus, onClick, isBlurred, isInvalidMsg } } = this.props
    
    return (
      <FormGroup className='jumperLabel'>
        <Label for={name}>{common[name]}</Label>
        <Input 
          id={name}
          type={type}
          name={name}
          onFocus={onFocus}
          onInput={e => {
            onInput(e)
            this.onInputFilterList(e)
          }}
          onBlur={onBlur}
          valid = { isBlurred[name] && isInvalidMsg[name] === '' }
          invalid = { isBlurred[name] && isInvalidMsg[name] !== '' }
        />
        <FormFeedback>{ isInvalidMsg[name] }</FormFeedback>
        <ListGroup className='d-none select'>
          {this.state.list.map(listItem => 
            <ListGroupItem 
              key={listItem} 
              data-en={listItem}
              onClick={onClick}>
              {common[listName][listItem]}
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

export default connect(mapStateToProps)(DropdownInputLabel)