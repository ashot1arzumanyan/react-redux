import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import getProposalsAction from '../../actions/getProposalsAction'
import ProposalItem from './ProposalItem'
import selected_proposals from '../../selectors/selected_proposals'

class Proposal extends Component {

  componentDidMount() {
    const { skip } = this.props
    if (skip === 0) {
      this.props.getProposalsAction(skip)
    }
  }

  render() {

    const { proposals, isFetchingGet } = this.props

    if(isFetchingGet && proposals.length === 0) {
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
        {isFetchingGet ? (
          <div style={{marginBottom: '10px'}}>Loading...</div>
        ) : ('')}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    proposals: selected_proposals(state),
  }
}

export default connect(mapStateToProps, {getProposalsAction})(Proposal)