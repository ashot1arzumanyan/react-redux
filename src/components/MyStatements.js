import React, { Component } from 'react'

import DemandEditDelete from './demand/DemandEditDelete'
import ProposalEditDelete from './proposal/ProposalEditDelete'

class MyStatements extends Component {

  render() {
    
    const { history } = this.props

    return (
      <div className="mt-4 d-flex justify-content-around">
        <div className='proposal_demand_container'>
          <ProposalEditDelete 
            history={history}
          /> 
        </div>
        <div className='proposal_demand_container'>
          <DemandEditDelete 
            history={history}
          />
        </div>
      </div>
    )
  }
}

export default MyStatements