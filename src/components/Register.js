import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Card } from 'reactstrap'

import registerUser from '../actions/registerUserAction'
import InputLabel from './inputs/InputLabel'
import InputWithJumperLabel from '../helpers/InputWithJumperLabel'

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

    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this)
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

  handleOnInput(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    if (this.state.isBlurred[name]) {
      this.validate(name, value)
    }
    this.setState({ [name]: value })
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
    const { userRegister } = this.props

    const commonProps = {
      onFocus: this.handleOnFocus,
      onBlur: this.handleOnBlur,
      onInput: this.handleOnInput,
      isBlurred: isBlurred,
      isInvalidMsg: isInvalidMsg
    }

    if (userRegister.confirmationMsgSent) {

      const CheckYourEmail = ({username, email}) => {
        return (
          <Card className='align-items-center'>
            <div className='col-4 d-flex flex-column align-items-center'>
              <h1>Բարև {username}</h1>
              <p className='text-center'>Գրանցումն ավարտելու համար խնդրւմ ենք ստուգել ձեր {email} հասցեն և հաստատել ձեր գրանցումը սեխմելով հաստատել կոճակը</p>
            </div>
          </Card>
        )
      }
      return <CheckYourEmail username={userRegister.username} email={userRegister.email} />
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
          <Button 
            color='success'
            onClick={this.handleSubmit}
            >
            Register
          </Button>
        </Form>
      </div>
    );
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
        case 'email':
          isInvalidMsg[name] = this.checkEmail(value)
          break;
  
        case 'username':
          isInvalidMsg[name] = this.checkUsername(value)
          break;
  
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

  checkEmail(value) {
    let msg = '';
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === '') {
      msg = 'Email should not be empty and most be a correct email';
    } else if (!emailRe.test(value)) {
      msg = 'Email is not correct';
    }
    return msg
  }

  checkUsername(value) {
    let msg = '';
    if (value === '') {
      msg = 'Username should not be empty and most be at least 3 characters'
    } else if (value.length < 3) {
      msg = 'Username most be at least 3 characters'
    }
    return msg
  }
}

const mapstateToProps = (state) => {
  return {
    // content: state.content.Register,
    userRegister: state.userRegister
  }
}

const connectRegister = connect(mapstateToProps, { registerUser })(Register)

export default connectRegister