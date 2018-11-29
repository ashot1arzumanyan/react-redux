import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, Form, Button } from 'reactstrap'

import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import { startSendEmail, resetPasswordSendEmail } from '../actions/resetPasswordSendEmailAction'

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
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
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
    this.props.startSendEmail()
    this.props.resetPasswordSendEmail({ email: this.state.email })
  }

  render() {

    const { common } = this.props
    const { isBlurred, isInvalidMsg } = this.state

    // const commonProps = {
    //   onFocus: this.handleOnFocus,
    //   onBlur: this.handleOnBlur,
    //   onInput: this.handleOnInput,
    //   isBlurred: isBlurred,
    //   isInvalidMsg: isInvalidMsg
    // }

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
          <Button
            onClick={this.handleSendEmail}
            >
            Send Verification code
          </Button>
        </Form>
      </div>
    ) 
  }
}

const mapstateToProps = (state) => {
  return {
    common: state.content.common,
  }
}

export default connect(mapstateToProps, {startSendEmail, resetPasswordSendEmail})(SendVerificationCode)