import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import ProposalItem from './ProposalItem'
import Amounts from '../proposalDemandCommon/Amounts'
import selected_proposals from '../../selectors/selected_proposals'
import LoadingButtonSpiner from '../LoadingButtonSpiner'

class Proposal extends PureComponent {

  render() {

    const { descriptions, filteredCount, toggleIsDemandOpen, proposals: { length } } = this.props
    
    return (
      <Fragment>
        <Amounts 
          color='green'
          content={this.props.common.proposal}
          onClick={toggleIsDemandOpen}
          length={length}
          count={filteredCount ? filteredCount : descriptions.skip === 0 ? descriptions.skip : descriptions.count}
        />
          {this.props.proposals.map((proposal) => 
            <div 
              className='Proposal mb-5'
              key={proposal._id}>
              <ProposalItem
                proposal={proposal}
                common={this.props.common}          
              />
            </div>
          )}
          {descriptions.isFetchingGet ? (
            <div className='position-relative mb-5'>
              <LoadingButtonSpiner />
            </div>
          ) : ('')}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    proposals: selected_proposals(state),
    common: state.content.common
  }
}

export default connect(mapStateToProps)(Proposal)