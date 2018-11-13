import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'
import DropdownInputLabelChildList from './DropdownInputLabelChildList'

class DropdownInputLabelWithChildList extends Component {

  constructor(props) {
    super(props)
    this.datasetEn = null,
    this.value = '',
    this.list = []
    this.childList = []
    this.state = {
      list: [],
      childList: []
    }
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
    const { datasetEn, value } = this.state

    return (
      <Fragment>
        <FormGroup className='jumperLabel'>
          <Label for={name}>{common[name]}</Label>
          <Input 
            id={name}
            type={type} 
            name={name}
            data-en={datasetEn}
            onFocus={onFocus}
            onInput={(e) => {
              onInput(e)
              this.onInputFilterOwnAndChildLists(e)
            }}
            onBlur={onBlur}
            value={value}
          />
          <ListGroup className='d-none select'>
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