import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, Form, Button } from 'reactstrap'

import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import resetPasswordSendEmail from '../actions/resetPasswordSendEmailAction'
import ButtonContent from './ButtonContent'

class SendVerificationCode extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isInvalidMsg: {
        email: '',
      },
      isBlurred: {
        email: false,
      }
    }

    this.handleOnInput = this.handleOnInput.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleSendEmail = this.handleSendEmail.bind(this)
  }

  handleOnInput(e) {
    if (!this.props.isFetching) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        [name]: value
      })
    }
  }

  handleOnFocus(e) {
    const input = new InputWithJumperLabel(e)
    input.focus()
  }

  handleOnBlur(e) {
    const input = new InputWithJumperLabel(e)
    input.blur()
  }

  handleSendEmail(e) {
    e.preventDefault()
    this.props.resetPasswordSendEmail({ email: this.state.email })
  }

  render() {

    const { common } = this.props

    return (
      <div className='d-flex flex-column align-items-center'>
      
        <Form className='col-4 mt-4'>
          <FormGroup className={'jumperLabel'}>
            <Label for='email'>{common.email}</Label>
            <Input 
              id='email' 
              name='email'
              onChange={this.handleOnInput} 
              onBlur={this.handleOnBlur}
              onFocus={this.handleOnFocus}
            />
          </FormGroup>
          <div className='d-flex justify-content-center position-relative mt-4'>
            <Button
              onClick={this.handleSendEmail}
              >
              <ButtonContent 
                isFetching={this.props.isFetching}
                content={common.send_instruction}
              />
            </Button>
          </div>
        </Form>
      </div>
    ) 
  }
}

const mapstateToProps = (state) => {
  return {
    common: state.content.common,
    isFetching: state.isFetchings.isFetching
  }
}

export default connect(mapstateToProps, { resetPasswordSendEmail})(SendVerificationCode)