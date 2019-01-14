import React, { Component } from 'react'
import { connect } from 'react-redux'

import editDemandAction from '../actions/editDemandAction'
import AddNewEditDemand from './AddNewEditDemand'

class EditDemand extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(demand) {
    this.props.editDemandAction(demand, () => {
      this.props.history.push('/')
    })
  }
  
  render() {

    return (
      <AddNewEditDemand 
        editMode={true}
        demand={this.props.location.state}
        submit={this.handleSubmit}
      />
    )
  }

}

export default connect(null, { editDemandAction })(EditDemand)