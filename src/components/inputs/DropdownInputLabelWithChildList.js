import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'
import DropdownInputWithJumperLabelFocus from '../../helpers/DropdownInputWithJumperLabelFocus'
import DropdownInputLabelChildList from './DropdownInputLabelChildList'

class DropdownInputLabelWithChildList extends Component {

  constructor(props) {
    super(props)
    this.list = []
    this.childList = []
    this.state = {
      list: [],
      childList: [],
      isListOpen: false,
      isInputHasValue: false
    }

    this.DropdownInputWithJumperLabelFocus = DropdownInputWithJumperLabelFocus.bind(this)
  }

  componentDidMount() {
    this.list = this.props.list
    this.childList = this.props.childList
    this.setState({
      list: this.list,
      childList: this.childList
    })
  }

  onInputFilterOwnAndChildLists(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValueLowerCased()
    const nameS = `${name}s`
    const content = this.props.cFF[nameS]
    let execution = true
    let valueMatched = false;
    let lowerCase = ''
    const matchedData = this.list.filter(m => {
      lowerCase = content[m].toLowerCase()
      if (execution && lowerCase === value) {
        execution = false
        valueMatched = m
      }
      return m.includes(value) || lowerCase.includes(value)
    })
    this.setState({
      list: matchedData
    })
    if (valueMatched) {
      const matchedChildData = this.childList.filter(m => {
        return m[name] === valueMatched
      })
      this.childList = matchedChildData
      this.setState({
        childList: matchedChildData
      })
    } else {
      this.childList = this.props.childList
      this.setState({
        childList: this.childList
      })
    }
  }

  onInputFilterOwnList(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValueLowerCased() 
    const content = this.props.cFF 
    const childListName = this.props.childListName
    let execution = true
    let lowerCase = ''
    const matchedData = this.childList.filter(m => {
      lowerCase = content[childListName][m[name]].toLowerCase()
      if(execution && lowerCase === value) {
        execution = false
        const keys = Object.keys(m)
        this.props.setNameValue(name, m[name])
        this.props.setNameValue(keys[1], m[keys[1]])
      }
      return m[name].includes(value) || lowerCase.includes(value)
    })
    this.setState({
      childList: matchedData
    })
  }

  render() {
    
    const { common, cFF, name, type, listName, childName, childListName, onInput, onBlur, onFocus, onClick, isBlurred, isInvalidMsg } = this.props
    const { isListOpen, isInputHasValue } = this.state

    return (
      <Fragment>
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
            onInput={(e) => {
              onInput(e)
              this.onInputFilterOwnAndChildLists(e)
            }}
            onBlur={onBlur}
          />
          {isListOpen ? (
          <ListGroup className='select'>
            {this.state.list.map(listItem => 
              <ListGroupItem 
                key={listItem} 
                className="d-flex justify-content-between"
                data-en={listItem}
                onClick={onClick}>
                {cFF[listName][listItem]}
              </ListGroupItem>
            )}
          </ListGroup>
          ) : (null) }
        </FormGroup>
        <DropdownInputLabelChildList 
          name={childName}
          type={type}
          onFocus={onFocus}
          onClick={onClick}
          onBlur={onBlur}
          onInput={(e) => {
            onInput(e)
            this.onInputFilterOwnList(e)
          }}
          list={this.state.childList}
          listName={childListName}
          isBlurred={isBlurred}
          isInvalidMsg={isInvalidMsg}
          match={name}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.content.common,
    cFF: state.content.Filter
  }
}

export default connect(mapStateToProps)(DropdownInputLabelWithChildList)