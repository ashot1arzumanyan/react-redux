import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, ListGroup, ListGroupItem, FormFeedback } from 'reactstrap'

import InputWithJumperLabel from '../../helpers/InputWithJumperLabel'

class YearPicker extends Component {

  constructor(props) {
    super(props)
    this.list = []
    this.state = {
      list: []
    }
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
    
    const { common, commonProps: { onFocus, onBlur, onInput, onClick, isBlurred, isInvalidMsg } } = this.props

    return ( 
      <FormGroup className='jumperLabel mr-5'>
        <Label for='year'>{common.year}</Label>
        <Input 
          id='year'
          type="text" 
          name="year"
          onFocus={onFocus}
          onInput={(e) => {
            onInput(e)
            this.onInputFilterList(e)
          }}
          onBlur={onBlur} 
          valid = { isBlurred.year && isInvalidMsg.year === '' }
          invalid = { isBlurred.year && isInvalidMsg.year !== '' }
        />
        <FormFeedback>{ isInvalidMsg.year }</FormFeedback>
        <ListGroup className='d-none select'>
          {this.state.list.map(year => 
            <ListGroupItem 
              key={year} 
              onClick={onClick}>
              {year}
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

export default connect(mapStateToProps)(YearPicker)