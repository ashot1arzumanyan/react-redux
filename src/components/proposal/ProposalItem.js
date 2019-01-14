import React, { PureComponent, Fragment } from 'react'
import { CardBody } from 'reactstrap'

import FooterProposalDemandItem from '../proposalDemandCommon/FooterProposalDemandItem'
import HeaderProposalDemandItem from '../proposalDemandCommon/HeaderProposalDemandItem'
import MiddleProposalItem from './MiddleProposalItem'
import Contacts from '../proposalDemandCommon/Contacts'
import ModalWithCommentContacts from '../proposalDemandCommon/ModalWithCommentContacts'
import { openContacts, mouseMoveOverStatement } from '../../helpers/Mouse'

class ProposalItem extends PureComponent {

  constructor(props) {
    super(props)
    this.node = React.createRef()
    this.isMouseMove = true;
    this.timeout = false;
    this.state = {
      isContactsOpen: false,
      modal: false,
      isReadMore: false
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleClick = openContacts.bind(this)
    this.mouseMoveCb = mouseMoveOverStatement.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    const height = this.node.current.offsetHeight
    const width = this.node.current.offsetWidth
    this.x_1_3 = Math.ceil(width / 3)
    this.y_1_2 = Math.ceil(height / 2)
    this.y_1_3 = Math.ceil(height / 3)
    const commentDiv = this.node.current.querySelector('.Comment span')
    this.setState({
      isReadMore: commentDiv.offsetWidth < commentDiv.scrollWidth   
    })
  }


  componentWillReceiveProps(prevState) {
    if (this.props.addNewMode) {
      try {
        const commentDiv = this.node.current.querySelector('.Comment span');
        const isReadMore = commentDiv.offsetWidth < commentDiv.scrollWidth;
        if (prevState.isReadMore !== isReadMore ) {
          this.setState({ isReadMore: isReadMore })
        }
      } catch (e) {
        console.log(e);
        return
      }
    }
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
    this.isMouseMove = true
  }

  handleMouseMove(cb) {
    if (this.isMouseMove) {
      cb()
    }
  }

  // handleMouseMove(cb) {
  //   if (this.isMouseMove) {
  //     if (!this.timeout) {
  //       cb()
  //       setTimeout(() => {
  //         this.timeout = false
  //       }, 200);
  //     }
  //     this.timeout = true
  //   }
  // }

  handleMouseLeave() {
    if(!this.timeout) {
      setTimeout(() => {
        this.node.current.style.transform = `rotateX(0deg) rotateY(0deg)`
        this.node.current.style.boxShadow = '0px 0px 10px 2px rgb(193, 193, 193)';
      }, 200);
      setTimeout(() => {
        this.setState({ isContactsOpen: false })
      }, 450);
    } else {
      this.node.current.style.transform = `rotateX(0deg) rotateY(0deg)`
      this.node.current.style.boxShadow = '0px 0px 10px 2px rgb(193, 193, 193)';
      setTimeout(() => {
        this.setState({ isContactsOpen: false })
      }, 250);
    }
    this.isMouseMove = true
  }

  render() {

    const { subType, price, unit, email, phone, username, description_one_word, comment, date, ...restProposal } = this.props.proposal
    const { isContactsOpen, isReadMore, modal } = this.state
    return (
      <Fragment>
        <div 
          className='position-absolute w-100 h-100'
          onMouseMove={
            (e) => this.handleMouseMove(() => this.mouseMoveCb(e))
          }
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          style={{zIndex: '1'}}
          >
          {isReadMore ? (
            <ModalWithCommentContacts 
              modal={modal}
              toggle={this.toggle}
              comment={comment}
              >
              <Contacts 
                email={email}
                phone={phone}
                username={username}
                common={this.props.common}
              />
            </ModalWithCommentContacts>
          ) : null}
        </div> 
        <div ref={this.node} className='card' >
          <CardBody>

            {isContactsOpen ? (
              <Contacts 
                email={email}
                phone={phone}
                username={username}
                common={this.props.common}
              />
            ) : (
              <Fragment>
                <HeaderProposalDemandItem
                  subType={subType}
                  unit={unit}
                  price={price}
                  description_one_word={description_one_word ? description_one_word : null}
                />
                <hr></hr>
                <MiddleProposalItem 
                  proposal={restProposal}
                  common={this.props.common}
                />
                <hr></hr>
                <FooterProposalDemandItem 
                  comment={comment}
                  date={date}
                  isReadMore={this.state.isReadMore}
                  more={this.props.common.more}
                />
              </Fragment>
            )}
           
          </CardBody>
        </div>
      </Fragment>
    )
  }
}

export default ProposalItem