import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'

import FooterProposalDemandItem from '../proposalDemandCommon/FooterProposalDemandItem'
import HeaderProposalDemandItem from '../proposalDemandCommon/HeaderProposalDemandItem'
import MiddleProposalItem from './MiddleProposalItem'
import Contacts from '../proposalDemandCommon/Contacts'

class ProposalItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isContactsOpen: false
    }

    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseOver() {
    this.setState({ isContactsOpen: true })
  }

  handleMouseLeave() {
    this.setState({ isContactsOpen: false })
  }

  render() {

    const { subType, price, unit, email, phone, yourName, comment, date, ...restProposal } = this.props.proposal

    return (
      <Card 
        className='shadow'
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}>
        <CardBody>
          <HeaderProposalDemandItem
            subType={subType}
            unit={unit}
            price={price}
          />
          <hr></hr>
          {this.state.isContactsOpen ? (
            <Contacts 
              email={email}
              phone={phone}
              yourName={yourName}
            />
          ) : (
            <MiddleProposalItem 
            proposal={restProposal}
          />
          )}
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