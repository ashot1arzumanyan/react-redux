import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startEditProposalAction, editProposalAction } from '../actions/editProposalAction'
import AddNewEditProposal from './AddNewEditProposal'

class EditProposal extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)  
  }

  handleSubmit(proposal) {
    const { startEditProposalAction, editProposalAction, history } = this.props
    startEditProposalAction()
    editProposalAction(proposal, () => {
      history.push('/')
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
const mapStateToProps = (state) => {
  return {
    startEditProposalAction: state.startEditProposalAction,
    editProposalAction: state.editProposalAction
  }
}

export default connect(mapStateToProps, { startEditProposalAction, editProposalAction })(EditProposal)