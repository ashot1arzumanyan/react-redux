import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Filter from './Filter'
import Proposal from './proposal/Proposal'
import Demand from './demand/Demand'

import { resetFilters } from '../actions/filterByAction'
import getStatements from '../actions/getStatementsAction'

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isProposalOpen: true,
      isDemandOpen: true,
      filteredProposalsCount: null,
      filteredDemandsCount: null
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.toggleIsDemandOpen = this.toggleIsDemandOpen.bind(this)
    this.toggleIsProposalOpen = this.toggleIsProposalOpen.bind(this)
    this.setCounts = this.setCounts.bind(this)
    this.resetCounts = this.resetCounts.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  toggleIsProposalOpen() {
    this.setState({
      isProposalOpen: !this.state.isProposalOpen
    })
  }

  toggleIsDemandOpen() {
    this.setState({
      isDemandOpen: !this.state.isDemandOpen
    })
  }

  setCounts(filteredProposalsCount, filteredDemandsCount) {
    this.setState({
      filteredProposalsCount: filteredProposalsCount,
      filteredDemandsCount: filteredDemandsCount
    })
  }

  resetCounts() {
    this.setState({
      filteredProposalsCount: null,
      filteredDemandsCount: null
    })
  }

  handleScroll() {
    const scrollTop = (document.documentElement &&
      document.documentElement.scrollTop ) ||
      document.body.scrollTop;
    
    const scrollHeight = (document.documentElement &&
      document.documentElement.scrollHeight ) ||
      document.body.scrollHeight;

    const clientHeight = document.documentElement.clientHeight ||
      window.innerHeight;

    const scrollToBottom = Math.ceil( (scrollTop + clientHeight) ) >= scrollHeight

    if (scrollToBottom) {
      const { p, d } = this.props
      if ((p.skip < p.count && !p.isFetchingGet) || (d.skip < d.count && !d.isFetchingGet)) {
        this.props.getStatements(p.skip, p.linkToCachedAll, d.skip, d.linkToCachedAll)
      }
    }
  }

  componentWillUnmount() {
    this.props.resetFilters()
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {

    const { p, d } = this.props
    const { isProposalOpen, isDemandOpen, filteredProposalsCount, filteredDemandsCount } = this.state

    return(
      <Fragment>
        <Filter 
          setCounts={this.setCounts}
          resetCounts={this.resetCounts}
        />
        <div 
          className='mt-4 d-flex w-100 justify-content-center'>
          {isProposalOpen ? (
            <div className='d-flex justify-content-center w-50'>
              <div 
                className='proposal_demand_container'>
                <Proposal 
                  toggleIsDemandOpen={this.toggleIsDemandOpen}
                  descriptions={p}
                  filteredCount={filteredProposalsCount}
                />          
              </div>
            </div>
          ) : (null)}
          {isDemandOpen ? (
            <div className='d-flex justify-content-center w-50'>
              <div 
                className='proposal_demand_container'>
                <Demand 
                  toggleIsProposalOpen={this.toggleIsProposalOpen}
                  descriptions={d}
                  filteredCount={filteredDemandsCount}
                />          
              </div>
            </div>
          ) : (null)}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    p: state.proposals.descriptions,
    d: state.demands.descriptions,
    filterBy: state.filterBy
  }
}

export default connect(
  mapStateToProps, 
  {resetFilters, getStatements})(Home)