import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuantityMiddleDemandItem extends Component {

  render() {

    const { content, quantity } = this.props

    return (
      <div className='d-flex flex-column justify-content-between align-items-center'>
        <span>{quantity}</span>
        <small className='text-muted'>{content}</small>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    content: state.content.common.quantity
  }
}

export default connect(mapStateToProps)(QuantityMiddleDemandItem)