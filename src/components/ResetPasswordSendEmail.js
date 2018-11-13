import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, Form, Button } from 'reactstrap'

import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import InputLabel from './inputs/InputLabel'
import { startSendEmail, resetPasswordSendEmail } from '../actions/resetPasswordSendEmailAction'

class ResetPasswordSendEmail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isInvalidMsg: {
        email: '',
        password: '',
        repeat_password: ''
      },
      isBlurred: {
        email: false,
        password: false,
        repeat_password: false
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
    this.props.resetPasswordSendEmail(this.state)
  }

  render() {

    const { common } = this.props
    const { isBlurred, isInvalidMsg } = this.state

    const commonProps = {
      onFocus: this.handleOnFocus,
      onBlur: this.handleOnBlur,
      onInput: this.handleOnInput,
      isBlurred: isBlurred,
      isInvalidMsg: isInvalidMsg
    }

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
          <InputLabel 
            name='password'
            type='password'
            commonProps={commonProps}
          />
          <InputLabel 
            name='repeat_password'
            type='password'
            commonProps={commonProps}
          />
          <FormGroup className='jumperLabel'>
            <Label for='verification_code'>Verification code</Label>
            <Input 
              id='verification_code'
              type='text'
              name='verification_code'
              onInput={this.handleOnInput}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
            />         
          </FormGroup>
        </Form>
      </div>
    ) 
  }
}

const mapstateToProps = (state) => {
  return {
    common: state.content.common,
    startSendEmail: state.startSendEmail,
    resetPasswordSendEmail: state.resetPasswordSendEmail
  }
}

export default connect(mapstateToProps, {startSendEmail, resetPasswordSendEmail})(ResetPasswordSendEmail)