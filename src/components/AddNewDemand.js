import React, { Component } from 'react'
import { connect } from 'react-redux'

import addNewDemandAction from '../actions/addNewDemandAction'
import AddNewEditDemand from './AddNewEditDemand'

class AddNewDemand extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(demand) {
    const { addNewDemandAction, history } = this.props
    addNewDemandAction(demand, () => {
      history.push('/')
    })
  }
  
  render() {

    return (
      <AddNewEditDemand 
        editMode={false}
        submit={this.handleSubmit}
      />
    )
  }

}

export default connect(null, { addNewDemandAction })(AddNewDemand)