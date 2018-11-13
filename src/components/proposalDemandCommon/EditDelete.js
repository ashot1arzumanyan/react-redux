import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'

class EditDelete extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      id: ''
    }

    this.toggle = this.toggle.bind(this)
    this.editStatement = this.editStatement.bind(this)
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }

  deleteStatement() {
    this.props.delete(this.state.id)
  }

  editStatement(e) {
    const id = this.findId(e)
    this.props.edit(id)
  }

  setId(e) {
    const id = this.findId(e)
    this.setState({ id: id })
  } 

  findId(e) {
    const target = e.target
    const parentWithId = target.parentElement.parentElement.parentElement.parentElement
    const id = parentWithId.dataset.id
    return id
  }

  render() {

    return(
      <div 
        className='d-flex justify-content-around position-absolute mb-2' 
        style={{top: '-30px', right: '24px', width: '70px'}}>
        <div>
          <a
            onClick={this.editStatement}>
            <img 
              src={require('./images/edit.svg')} 
              height='24'
            />
          </a>
        </div>
        <div>
          <a
            onClick={(e) => {
              this.toggle()
              this.setId(e)
            }}>
            <img 
              src={require('./images/delete.svg')} 
              height='24'
            />
          </a>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader> */}
            <ModalBody>
              Do you want to delete?
            </ModalBody>
            <ModalFooter>
              <Button 
                color="primary" 
                onClick={e => {
                  this.toggle()
                  this.deleteStatement()
                }}>
                Delete
              </Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default EditDelete