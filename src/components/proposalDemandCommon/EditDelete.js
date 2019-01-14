import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'

class EditDelete extends PureComponent {

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
          <span
            className='cursor-pointer'
            onClick={this.editStatement}>
            <img 
              src={require('./images/edit.svg')} 
              height='24'
              alt='Edit'
            />
          </span>
        </div>
        <div>
          <span
            className='cursor-pointer'
            onClick={(e) => {
              this.toggle()
              this.setId(e)
            }}>
            <img 
              src={require('./images/delete.svg')} 
              height='24'
              alt='Delete'
            />
          </span>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody>
              {this.props.common.ask_to_delete}
            </ModalBody>
            <ModalFooter>
              <Button 
                color="warning" 
                onClick={e => {
                  this.toggle()
                  this.deleteStatement()
                }}>
                {this.props.common.delete}
              </Button>{' '}
              <Button color="secondary" onClick={this.toggle}>{this.props.common.cancel}</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.content.common
  }
}

export default connect(mapStateToProps)(EditDelete)