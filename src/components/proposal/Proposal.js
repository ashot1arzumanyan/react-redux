import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import getProposalsAction from '../../actions/getProposalsAction'
import ProposalItem from './ProposalItem'
import selected_proposals from '../../selectors/selected_proposals'

class Proposal extends Component {

  componentDidMount() {
    this.props.getProposalsAction()
  }

  render() {

    const { proposals, isFetchingGet } = this.props

    if(isFetchingGet) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <Fragment>
        {proposals.map((proposal, i) => 
          <div 
            className='Proposal mb-5'
            key={i}>
            <ProposalItem
              proposal={proposal}            
            />
          </div>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    proposals: selected_proposals(state),
    isFetchingGet: state.proposals.isFetchingGet,
  }
}

export default connect(mapStateToProps, {getProposalsAction})(Proposal)