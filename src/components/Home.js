import React, { Component } from 'react'
import { connect } from 'react-redux'

import Filter from './Filter'
import Proposal from './proposal/Proposal'
import Demand from './demand/Demand'

import { resetFilters } from '../actions/filterByAction'

class Home extends Component {

  componentWillUnmount() {
    this.props.resetFilters()
  }

  render() {
    return(
      <div >
        <Filter filterBy={true} />
        <div className="mt-4 d-flex justify-content-around">
          <Proposal />          
          <Demand />          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resetFilters: (dispatch) => dispatch(resetFilters)
  }
}

export default connect(mapStateToProps, {resetFilters})(Home)