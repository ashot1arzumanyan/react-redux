import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'

import FooterProposalDemandItem from '../proposalDemandCommon/FooterProposalDemandItem'
import HeaderProposalDemandItem from '../proposalDemandCommon/HeaderProposalDemandItem'
import MiddleDemandItem from './MiddleDemandItem'
import Contacts from '../proposalDemandCommon/Contacts'

class DemandItem extends Component {

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

    const { subType, price, unit, email, phone, yourName, comment, date, ...restDemand } = this.props.demand

    return(
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
          <hr style={{width: '100%', transition: 'width 300ms'}}></hr>
          {this.state.isContactsOpen ? (
            <Contacts 
              email={email}
              phone={phone}
              yourName={yourName}
            />
          ) : (
            <MiddleDemandItem 
            demand={restDemand}
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

export default DemandItem