import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import getDemandsAction from '../../actions/getDemandsAction'
import selected_demands from '../../selectors/selected_demands'
import DemandItem from './DemandItem'

class Demand extends Component {

  componentDidMount() {
    this.props.getDemandsAction()
  }

  render() {

    const { demands, isFetchingGet } = this.props

    if(isFetchingGet) {
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
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    demands: selected_demands(state),
    isFetchingGet: state.demands.isFetchingGet,
  }
}

export default connect(mapStateToProps, {getDemandsAction})(Demand)