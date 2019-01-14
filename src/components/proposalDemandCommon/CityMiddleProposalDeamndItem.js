import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class CityMiddleProposalDeamndItem extends PureComponent {

  render() {

    const { common, city } = this.props

    return (
      <div className='d-flex flex-column justify-content-between align-items-center'>
        <span>{this.props.cities[city]}</span>
        <small className='text-muted'>{common.city}</small>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    common : state.content.common,
    cities: state.content.Filter.cities,
  }
}

export default connect(mapStateToProps)(CityMiddleProposalDeamndItem)