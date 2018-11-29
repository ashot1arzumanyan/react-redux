import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, Form, Button,  } from 'reactstrap'

import loginUser from '../actions/loginUserAction'
import InputWithJumperLabel from '../helpers/InputWithJumperLabel'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }

    this.handleOnInput = this.handleOnInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.switchToResetPassword = this.switchToResetPassword.bind(this)
  }

  componentDidMount() {
    const { email, isFirstLogin } = this.props.user;
    if (isFirstLogin) {
      this.setState({
        email: email
      })
      const emailInput = document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[name="password"]');
      emailInput.focus();
      passwordInput.focus();
    }
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

  handleSubmit() {
    const { email, password } = this.state;
    this.props.loginUser({email: email, password: password}, () => {
      this.props.history.push('/');
    })
  }

  render() {

    const email = 'email'
    const password = 'password'
    const { common, user: { isFirstLogin } } = this.props

    const AfterVerifingEmail = () => {
      if (isFirstLogin) {
        return <div>Դուք հաջողությամբ գրանցվել եք կարող եք մուտք գօրծել համակարգ։</div>
      }
      return ''
    }
    
    return (
      <div className='d-flex flex-column align-items-center'>

        <AfterVerifingEmail />
        
        <Form className='col-4 mt-4'>
          <FormGroup className={isFirstLogin ? 'jump' : 'jumperLabel'}>
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
          <Button
            color='link'
            onClick={this.switchToResetPassword}>
            Forgot password?
          </Button>
          <Button
            color='success'
            onClick={this.handleSubmit}
            >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    common: state.content.common,
    content: state.content.Login,
    loginUser: state.loginUser,
    user: state.user
  }
}

export default connect(mapstateToProps, { loginUser })(Login);