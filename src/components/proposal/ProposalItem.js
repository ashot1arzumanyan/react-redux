import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'

import FooterProposalDemandItem from '../proposalDemandCommon/FooterProposalDemandItem'
import HeaderProposalDemandItem from '../proposalDemandCommon/HeaderProposalDemandItem'
import MiddleProposalItem from './MiddleProposalItem'

class ProposalItem extends Component {

  render() {

    const { subType, price, unit, comment, date, ...restProposal } = this.props.proposal

    return (
      <Card className='shadow'>
        <CardBody>
          <HeaderProposalDemandItem
            subType={subType}
            unit={unit}
            price={price}
          />
          <hr></hr>
          <MiddleProposalItem 
            proposal={restProposal}
          />
          <hr></hr>
          <FooterProposalDemandItem 
            comment={comment}
            date={date}
          />
        </CardBody>
      </Card>
    )
  }
}

export default ProposalItem