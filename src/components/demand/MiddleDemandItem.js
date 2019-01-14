import React, { PureComponent } from 'react'

import CityMiddleProposalDeamndItem from '../proposalDemandCommon/CityMiddleProposalDeamndItem'
import VerticalDivider from '../proposalDemandCommon/VerticalDivider'
import MarkDateMiddleDemandItem from './MarkDateMiddleDemandItem'
import ContinuousMiddleDeamndItem from './ContinuousMiddleDeamndItem'
import QuantityMiddleDemandItem from './QuantityMiddleDemandItem'

const QuntityDateView = (props) => {
      
  if (props.demand.oneTime && props.demand.is_mark_the_date) {

    const { year, month } = props.demand
    const day = 'day' in props.demand ? props.demand.day : ''
    return (
      <MarkDateMiddleDemandItem 
        year={year}
        month={month}
        day={day}
        quantity={props.demand.quantity}
        common={props.common}
      />
    )

  } else if(props.demand.continuous) {

    return (
      <ContinuousMiddleDeamndItem 
        continuousType={props.demand.continuousType}
        frequencyNum={props.demand.frequencyNum}
        quantity={props.demand.quantity}
        common={props.common}
      />
    )

  } else {

    return (
      <QuantityMiddleDemandItem 
        quantity={props.demand.quantity}
        content={props.common.quantity}
      />
    )
  }
}

class MiddleDemandItem extends PureComponent {

  render() {

    return (
      <div className='d-flex justify-content-around' style={{height: '57px'}}>
        <CityMiddleProposalDeamndItem 
          city={this.props.demand.city}
        />
        <VerticalDivider />
        <QuntityDateView 
          demand={this.props.demand}
          common={this.props.common}
        />
      </div>
    )
  }
}

export default MiddleDemandItem