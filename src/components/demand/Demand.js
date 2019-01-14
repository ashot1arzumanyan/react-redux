import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import DemandItem from './DemandItem'
import Amounts from '../proposalDemandCommon/Amounts'
import selected_demands from '../../selectors/selected_demands'
import LoadingButtonSpiner from '../LoadingButtonSpiner'

class Demand extends PureComponent {

  render() {

    const { descriptions, filteredCount, toggleIsProposalOpen, demands: { length } } = this.props

    return(
      <Fragment>
        <Amounts 
          color='red'
          content={this.props.common.demand}
          onClick={toggleIsProposalOpen}
          length={length}
          count={filteredCount ? filteredCount : descriptions.skip === 0 ? descriptions.skip : descriptions.count}
        />
          {this.props.demands.map((demand) => 
            <div 
              className='Demand mb-5'
              key={demand._id}>
              <DemandItem 
                demand={demand}
                common={this.props.common}
              />
            </div>
          )}
          {descriptions.isFetchingGet ? (
            <div className='position-relative mb-5'>
              <LoadingButtonSpiner />
            </div>
          ) : (null)}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    demands: selected_demands(state),
    // descriptions: state.demands.descriptions,
    common: state.content.common
  }
}

export default connect(mapStateToProps)(Demand)