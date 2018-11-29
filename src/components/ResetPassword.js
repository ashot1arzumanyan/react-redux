import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'reactstrap'

import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import InputLabel from './inputs/InputLabel'
import resetPassword from '../actions/resetPasswordAction'

class ResetPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      key: '',
      password: '',
      repeat_password: '',
      isInvalidMsg: {
        password: '',
        repeat_password: ''
      },
      isBlurred: {
        password: false,
        repeat_password: false
      }
    }

    this.handleOnInput = this.handleOnInput.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const key = params.get('key')
    const email = params.get('email')  
    if (key && email) {
      this.setState({
        email: email,
        key: key
      })
      this.props.history.push('/resetPassword')
    }
  }

  handleOnInput(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    if (this.state.isBlurred[name]) {
      this.validate(name, value)
    }
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
    const { name, value } = input.getNameValue()
    input.blur()
    this.setIsBlurredTrue(name)
    this.validate(name, value)
  }

  setIsBlurredTrue(name) {
    const isBlurred = { ...this.state.isBlurred }
    isBlurred[name] = true
    this.setState({ isBlurred: isBlurred })
  }

  handleSubmit(e) {
    e.preventDefault();
    const hasInvalidMsg = this.validateAll()
    if (!hasInvalidMsg) {
      const { email, key, password, repeat_password } = this.state
      this.props.resetPassword(
        {
          email: email,
          key: key,
          password: password,
          repeat_password: repeat_password
        }, 
        this.props.history.push('/')
      )
    }
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
          <Button
            onClick={this.handleSubmit}
            >
            Change password
          </Button>
        </Form>
      </div>
    ) 
  }
  
  validateAll() {
    const isBlurred = { ...this.state.isBlurred }
    let entries = []
    let input
    const names = Object.keys(isBlurred)
    names.forEach(name => {
      isBlurred[name] = true 
      input = document.getElementById(name)
      entries.push({ name: name, value: input.value })
    })
    const isInvalidMsg = this.msgCreator(entries)
    this.setState({
      isBlurred: isBlurred,
      isInvalidMsg: isInvalidMsg
    })
    let hasInvalidMsg = false
    names.forEach(name => {
      if (!hasInvalidMsg && isInvalidMsg[name] !== '') {
        hasInvalidMsg = true
      }
    })
    return hasInvalidMsg
  }

  validate(name, value) {
    const isInvalidMsg = this.msgCreator([{ name: name, value: value.trim() }])
    this.setState({
      isInvalidMsg: isInvalidMsg
    })
  }

  msgCreator(entries = []) {
    const isInvalidMsg = {...this.state.isInvalidMsg}
    let name = '',
    value = ''
    entries.forEach(entry => {
      name = entry.name
      value = entry.value
      isInvalidMsg[name] = ''
      switch (name) {

          case 'password':
          const repeat_password = document.querySelector('input[name = "repeat_password"]');
          if (value === '') {
            isInvalidMsg[name] = 'Password should not be empty and most be at least 7 characters'
            break;
          }
          if (value.length < 7) {
            isInvalidMsg[name] = 'Password most be at least 7 characters'
            break;
          }
          if (value !== repeat_password.value.trim()) {
            isInvalidMsg[name] = 'Passwords not matched';
            isInvalidMsg[repeat_password.name] = 'Passwords not matched';
            break;
          } else {
            isInvalidMsg[repeat_password.name] = '';
          }
          break;
          
        case 'repeat_password':
          const password = document.querySelector('input[name = "password"]');
          if (value === '') {
            isInvalidMsg[name] = 'Password should not be empty and most be at least 7 characters'
            break;
          }
          if (value.length < 7) {
            isInvalidMsg[name] = 'Password most be at least 7 characters'
            break;
          }
          if (value !== password.value.trim()) {
            isInvalidMsg[name] = 'Passwords not matched';
            isInvalidMsg[password.name] = 'Passwords not matched';
            break;
          } else {
            isInvalidMsg[password.name] = '';
          }
      }
    })
    
    return isInvalidMsg 
  }
}

const mapstateToProps = (state) => {
  return {
    common: state.content.common,
  }
}

export default connect(mapstateToProps, { resetPassword })(ResetPassword)