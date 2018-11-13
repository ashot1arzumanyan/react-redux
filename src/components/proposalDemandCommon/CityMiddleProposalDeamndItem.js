import React, { Component } from 'react'
import { connect } from 'react-redux'

class CityMiddleProposalDeamndItem extends Component {

  render() {

    const { common, cFF, city } = this.props

    return (
      <div className='d-flex flex-column justify-content-between align-items-center'>
        <span>{cFF.cities[city]}</span>
        <small className='text-muted'>{common.city}</small>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    common : state.content.common,
    cFF: state.content.Filter,
  }
}

export default connect(mapStateToProps)(CityMiddleProposalDeamndItem)