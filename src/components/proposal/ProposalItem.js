import React, { Component, Fragment } from 'react'
import { Card, CardBody } from 'reactstrap'
import ReactDOM from 'react-dom'

import FooterProposalDemandItem from '../proposalDemandCommon/FooterProposalDemandItem'
import HeaderProposalDemandItem from '../proposalDemandCommon/HeaderProposalDemandItem'
import MiddleProposalItem from './MiddleProposalItem'
import Contacts from '../proposalDemandCommon/Contacts'
import { openContacts, mouseMoveOverStatement } from '../../helpers/Mouse'

class ProposalItem extends Component {

  constructor(props) {
    super(props)
    this.x = 0
    this.y = 0
    this.isMouseMove = true
    this.state = {
      isContactsOpen: false
    }

    // this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = openContacts.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    // this.mouseMoveCb = this.mouseMoveCb.bind(this)
    this.mouseMoveCb = mouseMoveOverStatement.bind(this)
  }

  componentDidMount() {
    this.card = ReactDOM.findDOMNode(this).nextElementSibling
    const height = this.card.offsetHeight
    const width = this.card.offsetWidth
    this.x_1_3 = Math.ceil(width / 3)
    this.y_1_2 = Math.ceil(height / 2)
    this.y_1_3 = Math.ceil(height / 3)
  }

  // handleMouseOver(e) {
  //   const { x, y } = new Mouse(e).findXY()
  //   this.x = x;
  //   this.y = y;
  // }

  handleMouseMove(e, cb) {
    if (this.isMouseMove) {
      cb(e)
    }
  }

  handleMouseLeave() {
    this.card.style.transform = `rotateX(0deg) rotateY(0deg)`
    this.isMouseMove = true
    setTimeout(() => {
      this.setState({ isContactsOpen: false })
    }, 250);
  }

  render() {

    const { subType, price, unit, email, phone, yourName, comment, date, ...restProposal } = this.props.proposal
    const { isContactsOpen } = this.state
    return (
      <Fragment>
        <div 
          className='position-absolute w-100 h-100'
          // onMouseOver={this.handleMouseOver} 
          onMouseMove={
            (e) => this.handleMouseMove(e, this.mouseMoveCb)
          }
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          style={{zIndex: '1'}}
          >
        </div> 
        <Card >
          <CardBody>

            {isContactsOpen ? (
              <Contacts 
                email={email}
                phone={phone}
                yourName={yourName}
              />
            ) : (
              <Fragment>
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
              </Fragment>
            )}
           
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

export default ProposalItem