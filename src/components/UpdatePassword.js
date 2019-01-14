import React, {Component} from 'react'
import { connect } from 'react-redux'

import { Form, Button } from 'reactstrap'

import InputLabel from './inputs/InputLabel'
import { handleFocus, handleBlur, handleInput, setIsBlurredTrue } from '../helpers/inputJumperLabelWithValidation'
import { validate, validateAll, Validator } from '../helpers/Validator'
import updatePasswordAction from '../actions/updatePasswordAction'
import ButtonContent from './ButtonContent'

class UpdatePassword extends Component {

  constructor(props) {
    super(props)

    this.state = {
      old_password: '',
      password: '',
      repeat_password: '',
      isBlurred: {
        password: false,
        repeat_password: false
      },
      isInvalidMsg: {
        password: '',
        repeat_password: ''
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
    if (!hasInvalidMsg && !this.props.isFetching) {
      const { old_password, password, repeat_password } = this.state
      this.props.updatePasswordAction({
        old_password: old_password,
        password: password,
        repeat_password: repeat_password
      })
    }
  }

  render() {

    const commonProps = {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onInput: this.handleInput,
      isBlurred: this.state.isBlurred,
      isInvalidMsg: this.state.isInvalidMsg
    }

    return (

      <Form className='mt-4 w-40'>
        <InputLabel 
          name='old_password'
          type='password'
          contentName='current_password'
          commonProps={commonProps}
        />
        <InputLabel 
          name='password'
          type='password'
          contentName='new_password'
          commonProps={commonProps}
        />
        <InputLabel 
          name='repeat_password'
          type='password'
          contentName='repeat_new_password'
          commonProps={commonProps}
        />
        <div className='d-flex justify-content-center mt-5'>
          <Button 
            type='submit'
            onClick={this.handleSubmit}
            >
            <ButtonContent 
              isFetching={this.props.isFetching}
              content={this.props.common.save}
            />
          </Button>
        </div>
      </Form>

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
  
const mapStateToProps = (state) => {
  return {
    common: state.content.common,
    isFetching: state.user.isFetching
  }
}
  
export default connect(mapStateToProps, {updatePasswordAction})(UpdatePassword)