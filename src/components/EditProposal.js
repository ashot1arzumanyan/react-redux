import React, { Component } from 'react'
import { connect } from 'react-redux'

import editProposalAction from '../actions/editProposalAction'
import AddNewEditProposal from './AddNewEditProposal'

class EditProposal extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)  
  }

  handleSubmit(proposal) {
    this.props.editProposalAction(proposal, () => {
      this.props.history.push('/')
    })
  }

  render() {
    
    return (
      <AddNewEditProposal 
        editMode={true}
        proposal={this.props.location.state}
        submit={this.handleSubmit}
      />
    )
  }

}

export default connect(null, { editProposalAction })(EditProposal)