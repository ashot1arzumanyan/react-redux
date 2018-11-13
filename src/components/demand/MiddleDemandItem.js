import React, { Component } from 'react'

import CityMiddleProposalDeamndItem from '../proposalDemandCommon/CityMiddleProposalDeamndItem'
import VerticalDivider from '../proposalDemandCommon/VerticalDivider'
import MarkDateMiddleDemandItem from './MarkDateMiddleDemandItem'
import ContinuousMiddleDeamndItem from './ContinuousMiddleDeamndItem'
import QuantityMiddleDemandItem from './QuantityMiddleDemandItem'

class MiddleDemandItem extends Component {

  render() {

    const { demand, demand: { quantity, oneTime, is_mark_the_date, continuous, city } } = this.props
    const QuntityDateView = () => {
      
      if (oneTime && is_mark_the_date) {

        const { year, month } = demand
        const day = 'day' in demand ? demand.day : ''
        return (
          <MarkDateMiddleDemandItem 
            year={year}
            month={month}
            day={day}
            quantity={quantity}
          />
        )

      } else if(continuous) {

        const { continuousType, frequencyNum } = demand
        return (
          <ContinuousMiddleDeamndItem 
            continuousType={continuousType}
            frequencyNum={frequencyNum}
            quantity={quantity}
          />
        )

      } else {

        return (
          <QuantityMiddleDemandItem 
            quantity={quantity}
          />
        )
      }
    }

    return (
      <div className='d-flex justify-content-around' style={{height: '57px'}}>
        <CityMiddleProposalDeamndItem 
          city={city}
        />
        <VerticalDivider />
        <QuntityDateView 
        
        />
      </div>
    )
  }
}

export default MiddleDemandItem