import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import EditDelete from '../proposalDemandCommon/EditDelete'
import getProposalsByIdAction from '../../actions/getProposalsByIdAction'
import ProposalItem from '../proposal/ProposalItem'
import deleteProposalAction from '../../actions/deleteProposalAction'
import LoadingButtonSpiner from '../LoadingButtonSpiner'

class MyStatements extends Component {
 
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.getProposalsByIdAction()
  }

  handleDelete(id) {
    const { history } = this.props
    this.props.deleteProposalAction(id, history)
  }

  handleEdit(id) {
    const { history, proposalsById } = this.props
    const proposal = proposalsById.filter(d => d._id === id)
    history.push({
      pathname: '/editProposal',
      state: proposal[0]
    })
  }

  render() {
        
    return (
      <Fragment>
        { this.props.proposalsById.map((proposal) =>
          <div 
            className='position-relative Proposal mb-5 mt-3'
            data-id={proposal._id}
            key={proposal._id}>
            <EditDelete 
              delete={this.handleDelete}
              edit={this.handleEdit}
            />
            <ProposalItem
              proposal={proposal}  
              common={this.props.common}          
            />
          </div>
        )}         
        {this.props.isFetching ? (
          <div className='position-relative mt-3'>
            <LoadingButtonSpiner />
          </div>
        ) : null}
      </Fragment>
    )
  }
}

const mapstateToProps = (state) => {
  return {
    proposalsById: state.proposalsById.proposalsById,
    isFetching: state.proposalsById.isFetching,
    common: state.content.common
  }
}

export default connect(mapstateToProps, {getProposalsByIdAction, deleteProposalAction})(MyStatements)