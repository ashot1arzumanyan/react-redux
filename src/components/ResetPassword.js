import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'reactstrap'

import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import InputLabel from './inputs/InputLabel'
import resetPassword from '../actions/resetPasswordAction'
import ButtonContent from './ButtonContent'
import { validate, validateAll, Validator } from '../helpers/Validator'

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
    this.validate = validate.bind(this)
    this.validateAll = validateAll.bind(this)
    this.Validator = Object.create(Validator.prototype)
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
    if (!hasInvalidMsg && !this.props.isFetching) {
      const { email, key, password, repeat_password } = this.state
      this.props.resetPassword(
        {
          email: email,
          key: key,
          password: password,
          repeat_password: repeat_password
        }, 
        () => this.props.history.push('/')
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
          <div className='d-flex justify-content-center position-relative mt-4'>
            <Button
              onClick={this.handleSubmit}
              >
              <ButtonContent 
                isFetching={this.props.isFetching}
                content={common.change_password}
              />
            </Button>
          </div>
        </Form>
      </div>
    ) 
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
          const { 
            passwordMsg, 
            repeat_passwordMsg } = this.Validator.checkPassword(value, isInvalidMsg.repeat_password);
          isInvalidMsg[name] = passwordMsg;
          isInvalidMsg.repeat_password = repeat_passwordMsg;
          break;
        case 'repeat_password':
          const { 
            passwordMsg_2,
            repeat_passwordMsg_2 } = this.Validator.checkRepeatPassword(value, isInvalidMsg.password);
          isInvalidMsg[name] = repeat_passwordMsg_2;
          isInvalidMsg.password = passwordMsg_2;
          break
        default:
          break;
      }
    })
    
    return isInvalidMsg 
  }
}

const mapstateToProps = (state) => {
  return {
    common: state.content.common,
    isFetching: state.isFetchings.isFetching
  }
}

export default connect(mapstateToProps, { resetPassword })(ResetPassword)