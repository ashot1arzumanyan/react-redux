import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import QuantityMiddleDemandItem from './QuantityMiddleDemandItem'

class MarkDateMiddleDemandItem extends Component {
  render() {

    const { common, year, month, day, quantity } = this.props
    const monthStr = month ? moment().localeData().months()[month - 1] : ''

    return (
      <div className='d-flex flex-column justify-content-between align-items-center'>

        <div className='d-flex flex-column justify-content-between align-items-center'>
          <div className='d-flex'>
            <QuantityMiddleDemandItem 
              quantity={quantity}
            />
            <div className='d-flex align-items-center position-relative' style={{minHeight: '100%', whiteSpace: 'nowrap'}}>
              <small className='text-muted position-absolute' style={{top: '100%', left: '-100%' }}>{ common.oneTime }</small>

              <div className='vertical_divider mx-3'></div>
            </div>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <small>{`${day} ${monthStr} ${year}`}</small>
              <small className='text-muted'>{ common.when }</small>
            </div>
          </div>
          {/* <small className='text-muted'>{ common.oneTime }</small> */}
        </div>

      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return{
    common : state.content.common,
  }
}

export default connect(mapStateToProps)(MarkDateMiddleDemandItem)