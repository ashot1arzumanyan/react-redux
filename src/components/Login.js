import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, Form, Button,  } from 'reactstrap'

import loginUser from '../actions/loginUserAction'
import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import ButtonContent from './ButtonContent'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleOnInput = this.handleOnInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.switchToResetPassword = this.switchToResetPassword.bind(this)
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

  switchToResetPassword() {
    this.props.history.push('/sendVerificationCode')
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.props.isFetching) {
      const { email, password } = this.state;
      this.props.loginUser({email: email, password: password}, () => {
        this.props.history.push('/');
      })
    }
  }

  render() {

    const email = 'email'
    const password = 'password'
    const { common, content } = this.props
    
    return (
      <div className='d-flex flex-column align-items-center'>        
        <Form className='col-4 mt-5'>
          <FormGroup className='jumperLabel'>
            <Label for={email}>{common.email}</Label>
            <Input 
              id={email} 
              name={email} 
              onChange={this.handleOnInput} 
              onBlur={this.handleOnBlur}
              onFocus={this.handleOnFocus}
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup className='jumperLabel'>
            <Label for={password}>{common.password}</Label>
            <Input 
              type={password} 
              name={password} 
              id={password} 
              onChange={this.handleOnInput} 
              onBlur={this.handleOnBlur}
              onFocus={this.handleOnFocus}
            />
          </FormGroup>
          <div className='d-flex justify-content-center position-relative mt-4'>
            <Button
              type='submit'
              onClick={this.handleSubmit}
              >
              <ButtonContent 
                isFetching={this.props.isFetching}
                content={common.login}
              />
            </Button>
            <Button
              color='link'
              className='forgot_password'
              onClick={this.switchToResetPassword}>
              {content.forgot_password}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    common: state.content.common,
    content: state.content.Login,
    isFetching: state.user.isFetching
  }
}

export default connect(mapstateToProps, { loginUser })(Login);