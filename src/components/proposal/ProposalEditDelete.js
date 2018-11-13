import React, { Component } from 'react'
import { connect } from 'react-redux'

import EditDelete from '../proposalDemandCommon/EditDelete'
import getProposalsByIdAction from '../../actions/getProposalsByIdAction'
import ProposalItem from '../proposal/ProposalItem'
import deleteProposalAction from '../../actions/deleteProposalAction'

class MyStatements extends Component {
 
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    const _id = this.props.user._id
    this.props.getProposalsByIdAction(_id)
  }

  handleDelete(id) {
    console.log(id);
    const { history } = this.props
    this.props.deleteProposalAction(id, history)
  }

  handleEdit(id) {
    const { history, proposalsById } = this.props
    console.log(this.props);
    const proposal = proposalsById.filter(d => d._id === id)
    console.log(proposal[0]);
    history.push({
      pathname: '/editProposal',
      state: proposal[0]
    })
  }

  render() {
    
    const { proposalsById } = this.props
    
    return (
      <div className='col-6'>
        { proposalsById.map((proposal, i) =>
          <div 
            className='position-relative Proposal mb-5 mt-3'
            data-id={proposal._id}
            key={i}>
            <EditDelete 
              delete={this.handleDelete}
              edit={this.handleEdit}
            />
            <ProposalItem
              proposal={proposal}            
            />
          </div>
        )}         
      </div>
    )
  }
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
    proposalsById: state.proposalsById.proposalsById,
  }
}

export default connect(mapstateToProps, {getProposalsByIdAction, deleteProposalAction})(MyStatements)