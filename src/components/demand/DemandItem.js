import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'

import FooterProposalDemandItem from '../proposalDemandCommon/FooterProposalDemandItem'
import HeaderProposalDemandItem from '../proposalDemandCommon/HeaderProposalDemandItem'
import MiddleDemandItem from './MiddleDemandItem'

class DemandItem extends Component {

  render() {

    const { subType, price, unit, comment, date, ...restDemand } = this.props.demand

    return(
      <Card className='shadow'>
        <CardBody>
          <HeaderProposalDemandItem 
            subType={subType}
            unit={unit}
            price={price}
          />
          <hr></hr>
          <MiddleDemandItem 
            demand={restDemand}
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

export default DemandItem