import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import getDemandsAction from '../../actions/getDemandsAction'
import selected_demands from '../../selectors/selected_demands'
import DemandItem from './DemandItem'

class Demand extends Component {

  componentDidMount() {
    const { skip } = this.props
    if (skip === 0) {
      this.props.getDemandsAction(skip)
    }
  }

  render() {

    const { demands, isFetchingGet } = this.props

    if(isFetchingGet && demands.length === 0) {
      return (
        <div>Loading...</div>
      )
    }
    return(
      <Fragment>
        {demands.map((demand, i) => 
          <div 
            className='Demand mb-5'
            key={i}>
            <DemandItem 
              demand={demand}
            />
          </div>
        )}
        {isFetchingGet ? (
          <div style={{marginBottom: '10px'}}>Loading...</div>
        ) : ('')}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    demands: selected_demands(state),
  }
}

export default connect(mapStateToProps, {getDemandsAction})(Demand)