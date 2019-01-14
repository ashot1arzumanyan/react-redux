import React, { Component } from 'react'
import { connect } from 'react-redux'

import addNewProposalAction from '../actions/addNewProposalAction'
import AddNewEditProposal from './AddNewEditProposal'

class AddNewProposal extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)  
  }

  handleSubmit(proposal) {
    const { addNewProposalAction, history } = this.props
    addNewProposalAction(proposal, () => {
      history.push('/')
    })
  }

  render() {
    
    return (
      <AddNewEditProposal 
        editMode={false}
        submit={this.handleSubmit}
      />
    )
  }

}

export default connect(null, { addNewProposalAction })(AddNewProposal)