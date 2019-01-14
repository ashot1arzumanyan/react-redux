import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'reactstrap'

import registerUser from '../actions/registerUserAction'
import InputLabel from './inputs/InputLabel'
import { handleFocus, handleBlur, handleInput, setIsBlurredTrue } from '../helpers/inputJumperLabelWithValidation'
import { Validator, validate, validateAll } from '../helpers/Validator'
import ButtonContent from './ButtonContent'

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isInvalidMsg: {
        email: '',
        username: '',
        password: '',
        repeat_password: ''
      },
      isBlurred: {
        email: false,
        username: false,
        password: false,
        repeat_password: false
      }
    }

    this.handleFocus = handleFocus 
    this.handleBlur = handleBlur.bind(this)
    this.handleInput = handleInput.bind(this)
    this.setIsBlurredTrue = setIsBlurredTrue.bind(this)
    this.validate = validate.bind(this)
    this.validateAll = validateAll.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.Validator = Object.create(Validator.prototype)
  }

  handleSubmit(e) {
    e.preventDefault();
    const hasInvalidMsg = this.validateAll()
    if (!hasInvalidMsg && !this.props.userRegister.isFetching) {
      const { email, username, password, repeat_password } = this.state
      this.props.registerUser({
        email: email,
        username: username,
        password: password,
        repeat_password: repeat_password
      })
    }
  }

  render() {

    const { isInvalidMsg, isBlurred } = this.state;
    const { userRegister, content, common } = this.props

    const commonProps = {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onInput: this.handleInput,
      isBlurred: isBlurred,
      isInvalidMsg: isInvalidMsg
    }

    if (userRegister.confirmationMsgSent) {
      return (
        <div className='d-flex justify-content-center align-items-center'>
          <div className='col-4 d-flex flex-column align-items-center'>
            <p 
              className='text-center'>
              {content.registrationSuccess}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className='d-flex justify-content-center'>
        <Form className='col-4 mt-4'>
          <InputLabel 
            name='email'
            type='text'
            commonProps={commonProps}
          />
          <InputLabel 
            name='username'
            type='text'
            commonProps={commonProps}
          />
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
          <div className='d-flex justify-content-center mt-4'>
            <Button 
              type='submit'
              onClick={this.handleSubmit}
              >
              <ButtonContent 
                isFetching={userRegister.isFetching}
                content={common.register}
              />
            </Button>
          </div>
        </Form>
      </div>
    );
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
        case 'email':
          isInvalidMsg[name] = this.Validator.checkEmail(value)
          break;
  
        case 'username':
          isInvalidMsg[name] = this.Validator.checkUsername(value)
          break;
  
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
          break;
        default:
          break;
      }
    })

    return isInvalidMsg
  }

}

const mapstateToProps = (state) => {
  return {
    content: state.content.Register,
    common: state.content.common,
    userRegister: state.userRegister,
  }
}

export default connect(mapstateToProps, { registerUser })(Register)
