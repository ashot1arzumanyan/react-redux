import React, { Component } from 'react'
import { connect } from 'react-redux'

import { startAddNewProposalAction, addNewProposalAction } from '../actions/addNewProposalAction'
import AddNewEditProposal from './AddNewEditProposal'

class AddNewProposal extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)  
  }

  handleSubmit(proposal) {
    const { startAddNewProposalAction, addNewProposalAction, history } = this.props
    startAddNewProposalAction()
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
const mapStateToProps = (state) => {
  return {
    startAddNewProposalAction: state.startAddNewProposalAction,
    addNewProposalAction: state.addNewProposalAction
  }
}

export default connect(mapStateToProps, { startAddNewProposalAction, addNewProposalAction })(AddNewProposal)