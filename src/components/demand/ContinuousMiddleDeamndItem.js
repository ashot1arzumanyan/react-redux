import React, { Component } from 'react'
import { connect } from 'react-redux'

import QuantityMiddleDemandItem from './QuantityMiddleDemandItem'

class ContinuousMiddleDeamndItem extends Component {
  render() {

    const { common, continuousType, frequencyNum, quantity } = this.props
    const ct = common[continuousType].toLowerCase();
    const Small = () => {
      if (frequencyNum === '1') {
        return <small>{ `Ամեն ${ct}` }</small>
      }
      return <small>{ `Ամեն ${frequencyNum} ${ct}ը մեկ` }</small>
    }
    return (
      <div className='d-flex flex-column justify-content-between align-items-center'>

        <div className='d-flex flex-column justify-content-between align-items-center'>
          <div className='d-flex'>
            <QuantityMiddleDemandItem 
              quantity={quantity}
            />
            <div className='d-flex align-items-center position-relative' style={{minHeight: '100%'}}>
              <small className='text-muted position-absolute' style={{top: '100%', left: '-100%' }}>{ common.continuous }</small>

              <div className='vertical_divider mx-3'></div>
            </div>
            <div className='d-flex flex-column justify-content-between align-items-center'>
              <Small></Small>
              <small className='text-muted'>{ common.frequency }</small>
            </div>
          </div>
          {/* <small className='text-muted'>{ common.continuous }</small> */}
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

export default connect(mapStateToProps)(ContinuousMiddleDeamndItem)