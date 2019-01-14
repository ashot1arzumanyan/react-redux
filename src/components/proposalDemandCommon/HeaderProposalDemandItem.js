import React from 'react'
import { connect } from 'react-redux'

import DramSign from './images/dram-my.jsx'

const DescriptionOneWord = (props) => {
  if (!props.description_one_word) {
    return null
  }
  return (
    <small className='text-muted ml-4'>
      {props.description_one_word}
    </small>
  )
}

class HeaderProposalDemandItem extends React.PureComponent {

  render() {

    const { subType, unit, price, description_one_word } = this.props

    return (
      <div className='d-flex justify-content-between'>
        <span>
          {this.props.subTypes[subType]}
          <DescriptionOneWord description_one_word={description_one_word}/>
        </span>
        <span className='price-container'>
          <small 
            className='text-muted'>
            1 {this.props.units[unit]} 
          </small>
          {` ${price}`}
          <DramSign />
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    subTypes: state.content.Filter.subTypes,
    units : state.content.Filter.units
  }
}

export default connect(mapStateToProps)(HeaderProposalDemandItem)