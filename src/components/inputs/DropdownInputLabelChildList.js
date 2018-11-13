import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FormGroup, Label, Input, FormFeedback, ListGroup, ListGroupItem } from 'reactstrap'

class DropdownInputLabelChildList extends Component {

  render() {

    const { common, cFF, name, list, type, listName, match, onInput, onBlur, onFocus, onClick, isBlurred, isInvalidMsg } = this.props

    return (
      <FormGroup className='jumperLabel'>
        <Label for={name}>{common[name]}</Label>
        <Input 
          id={name}
          type={type} 
          name={name}
          onFocus={onFocus}
          onInput={onInput}
          onBlur={onBlur}
          valid = { isBlurred[name] && isInvalidMsg[name] === '' }
          invalid = { isBlurred[name] && isInvalidMsg[name] !== '' }
        />
        <FormFeedback>{ isInvalidMsg[name] }</FormFeedback>
        <ListGroup className='d-none select'>
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
      </FormGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.content.common,
    cFF: state.content.Filter
  }
}

export default connect(mapStateToProps)(DropdownInputLabelChildList)