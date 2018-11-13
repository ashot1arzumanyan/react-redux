import React, { Component } from 'react'
import { connect } from 'react-redux'

import VerticalDivider from '../proposalDemandCommon/VerticalDivider'

class PlanToHaveContinuous extends Component {
  render() {
    const { common, plan_to_have_quantity, plan_to_have_price, continuousType, frequencyNum, } = this.props
    const ct = common[continuousType].toLowerCase();
    const Small = () => {
      if (frequencyNum === '1') {
        return <small>{ `Ամեն ${ct}` }</small>
      }
      return <small>{ `Ամեն ${frequencyNum} ${ct}ը մեկ` }</small>
    }

    return (
      <React.Fragment>
        <VerticalDivider />

        <div className='d-flex flex-column justify-content-between align-items-center'>
          <div className='d-flex'>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <small>{plan_to_have_quantity}</small>
              <small className='text-muted'>{common.quantity}</small>
            </div>
            <VerticalDivider className='mx-3'/>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <small>{plan_to_have_price}</small>
              <small className='text-muted'>{common.price}</small>
            </div>
            <VerticalDivider className='mx-3'/>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <Small></Small>
              <small className='text-muted'>{ common.frequency }</small>
            </div>
          </div>
          <small className='text-muted'>Planavorum em unenal</small>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    common : state.content.common,
  }
}

export default connect(mapStateToProps)(PlanToHaveContinuous)