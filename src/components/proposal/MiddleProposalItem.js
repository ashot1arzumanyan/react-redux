import React, { Component } from 'react'
import { connect } from 'react-redux'

import CityMiddleProposalDeamndItem from '../proposalDemandCommon/CityMiddleProposalDeamndItem'
import VerticalDivider from '../proposalDemandCommon/VerticalDivider'
import PlanToHaveOneTime from './PlanToHaveOneTime'
import PlanToHaveContinuous from './PlanToHaveContinuous'

class MiddleProposalItem extends Component {

  render() {

    const { 
      common,
      proposal, 
      proposal: { 
        is_plan_to_have, 
        oneTime, continuous, 
        plan_to_have_quantity, 
        plan_to_have_price 
      } 
    } = this.props

    const PlanToHaveSection = () => {
      if (is_plan_to_have) {
        if (oneTime) {
          const { year, month } = proposal
          const day = 'day' in proposal ? proposal.day : ''
          return (
            <PlanToHaveOneTime 
              plan_to_have_quantity={plan_to_have_quantity}
              plan_to_have_price={plan_to_have_price}
              year={year}
              month={month}
              day={day}
            />
          )
        } else if(continuous) {
          const { continuousType, frequencyNum } = proposal
          return (
            <PlanToHaveContinuous 
              plan_to_have_quantity={plan_to_have_quantity}
              plan_to_have_price={plan_to_have_price}
              continuousType={continuousType}
              frequencyNum={frequencyNum}
            />
          )
        }
      }
      return null
    }

    return (
      <div className='d-flex justify-content-around' style={{height: '57px'}}>
        <CityMiddleProposalDeamndItem 
          city={proposal.city}
        />
        <VerticalDivider />
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <span>{proposal.available_quantity}</span>
          <small className='text-muted'>{common.available_quantity}</small>
        </div>
        <PlanToHaveSection />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    common: state.content.common
  }
}

export default connect(mapStateToProps)(MiddleProposalItem)