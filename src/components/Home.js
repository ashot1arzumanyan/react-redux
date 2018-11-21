import React, { Component } from 'react'
import { connect } from 'react-redux'

import Filter from './Filter'
import Proposal from './proposal/Proposal'
import Demand from './demand/Demand'

import { resetFilters } from '../actions/filterByAction'
import getDemandsAction from '../actions/getDemandsAction'
import getProposalsAction from '../actions/getProposalsAction'

class Home extends Component {

  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const { skip_proposal, 
      count_proposal, 
      isFetchingGet_proposal, 
      linkToCachedAll_proposal,
      skip_demand, 
      count_demand, 
      isFetchingGet_demand, 
      linkToCachedAll_demand
    } = this.props
    const scrollTop = (document.documentElement &&
      document.documentElement.scrollTop ) ||
      document.body.scrollTop;
    
    const scrollHeight = (document.documentElement &&
      document.documentElement.scrollHeight ) ||
      document.body.scrollHeight;

    const clientHeight = document.documentElement.clientHeight ||
      window.innerHeight;

    const scrollToBottom = Math.ceil( (scrollTop + clientHeight) ) >= scrollHeight
    console.log(scrollToBottom);
    console.log(count_proposal, count_demand);
    if (scrollToBottom) {
      if (skip_proposal < count_proposal && !isFetchingGet_proposal) {
        this.props.getProposalsAction(skip_proposal, linkToCachedAll_proposal)
      }
      if (skip_demand < count_demand && !isFetchingGet_demand) {
        this.props.getDemandsAction(skip_demand, linkToCachedAll_demand)
      }
    }
  }

  componentWillUnmount() {
    this.props.resetFilters()
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {

    const { skip_proposal, isFetchingGet_proposal, skip_demand, isFetchingGet_demand } = this.props
    return(
      <div >
        <Filter />
        <div className="mt-4 d-flex w-100">
          <div className='proposal_demand_container'>
            <Proposal 
              skip={skip_proposal}
              isFetchingGet={isFetchingGet_proposal}
            />          
          </div>
          <div className='proposal_demand_container'>
            <Demand 
              skip={skip_demand}
              isFetchingGet={isFetchingGet_demand}
            />          
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFetchingGet_demand: state.demands.isFetchingGet,
    skip_demand: state.demands.skip,
    count_demand: state.demands.count,
    linkToCachedAll_demand: state.demands.linkToCachedAll,
    isFetchingGet_proposal: state.proposals.isFetchingGet,
    skip_proposal: state.proposals.skip,
    count_proposal: state.proposals.count,
    linkToCachedAll_proposal: state.proposals.linkToCachedAll
  }
}

export default connect(mapStateToProps, {resetFilters, getDemandsAction, getProposalsAction})(Home)