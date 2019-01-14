import React, { PureComponent } from 'react'

import CityMiddleProposalDeamndItem from '../proposalDemandCommon/CityMiddleProposalDeamndItem'
import VerticalDivider from '../proposalDemandCommon/VerticalDivider'
import PlanToHaveOneTime from './PlanToHaveOneTime'
import PlanToHaveContinuous from './PlanToHaveContinuous'

const PlanToHaveSection = (props) => {

  if (props.proposal.is_plan_to_have) {
    if (props.proposal.oneTime) {

      const { year, month } = props.proposal
      const day = 'day' in props.proposal ? props.proposal.day : ''
  
      return (
        <PlanToHaveOneTime 
          plan_to_have_quantity={props.proposal.plan_to_have_quantity}
          plan_to_have_price={props.proposal.plan_to_have_price}
          year={year}
          month={month}
          day={day}
          common={props.common}
        />
      )
    } else if(props.proposal.continuous) {

      return (
        <PlanToHaveContinuous 
          plan_to_have_quantity={props.proposal.plan_to_have_quantity}
          plan_to_have_price={props.proposal.plan_to_have_price}
          continuousType={props.proposal.continuousType}
          frequencyNum={props.proposal.frequencyNum}
          common={props.common}
        />
      )
    }
  }
  return null
}

class MiddleProposalItem extends PureComponent {

  render() {

    return (
      <div className='d-flex justify-content-around' style={{height: '57px'}}>
        <CityMiddleProposalDeamndItem 
          city={this.props.proposal.city}
        />
        <VerticalDivider />
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <span>{this.props.proposal.available_quantity}</span>
          <small className='text-muted'>{this.props.common.available_quantity}</small>
        </div>
        <PlanToHaveSection 
          proposal={this.props.proposal}
          common={this.props.common}
        />
      </div>
    )
  }
}

export default MiddleProposalItem