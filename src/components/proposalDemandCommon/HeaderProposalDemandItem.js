import React, { Component } from 'react'
import { connect } from 'react-redux'

class HeaderProposalDemandItem extends Component {

  render() {

    const { common, cFF, subType, unit, price } = this.props

    return (
      <div className='d-flex justify-content-between'>
        <span>{cFF.subTypes[subType]}</span>
        <span><small className='text-muted'>1 {common.units[unit]} </small>{price}<small className='text-muted'> dram</small></span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    cFF: state.content.Filter,
    common : state.content.common
  }
}

export default connect(mapStateToProps)(HeaderProposalDemandItem)