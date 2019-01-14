import React, { PureComponent } from 'react'
import moment from 'moment'

import VerticalDivider from '../proposalDemandCommon/VerticalDivider'

class PlanToHaveOneTime extends PureComponent {
  render() {
    const { common, plan_to_have_quantity, plan_to_have_price, year, month, day } = this.props
    const monthStr = month ? moment().localeData().months()[month - 1] : ''

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
              <small>{`${day} ${monthStr} ${year}`}</small>
              <small className='text-muted'>{ common.when }</small>
            </div>
          </div>
          <small className='text-muted'>{common.plan_to_have}</small>
        </div>
      </React.Fragment>
    )
  }
}

export default PlanToHaveOneTime