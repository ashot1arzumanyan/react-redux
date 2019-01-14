import React from 'react'
import { CardBody, Modal, ModalBody, ModalFooter } from 'reactstrap'

class ModalWithCommentContacts extends React.PureComponent {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
        <ModalBody>
          { this.props.comment }
        </ModalBody>
        <ModalFooter>
          <div className='card w-75'>
            <CardBody>
              {this.props.children}
            </CardBody>
          </div>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalWithCommentContacts