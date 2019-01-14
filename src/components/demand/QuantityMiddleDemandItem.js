import React, { PureComponent } from 'react'

class QuantityMiddleDemandItem extends PureComponent {

  render() {

    return (
      <div className='d-flex flex-column justify-content-between align-items-center'>
        <span>{this.props.quantity}</span>
        <small className='text-muted'>{this.props.content}</small>
      </div>
    )
  }
}

export default QuantityMiddleDemandItem