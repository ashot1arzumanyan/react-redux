import React, { Component } from 'react'

import DemandEditDelete from './demand/DemandEditDelete'
import ProposalEditDelete from './proposal/ProposalEditDelete'

class MyStatements extends Component {

  render() {
    
    const { history } = this.props

    return (
      <div className="mt-4 d-flex justify-content-around">
        <ProposalEditDelete 
          history={history}
        />
        <DemandEditDelete 
          history={history}
        />
      </div>
    )
  }
}

export default MyStatements