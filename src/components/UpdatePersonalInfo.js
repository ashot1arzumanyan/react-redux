import React, {Component} from 'react'
import { connect } from 'react-redux'

import { Form, Button } from 'reactstrap'

import changePersonalInfoAction from '../actions/changePersonalInfoAction'
import InputLabel from './inputs/InputLabel'
import ButtonContent from './ButtonContent'
import { handleFocus, handleBlur, handleInput, setIsBlurredTrue } from '../helpers/inputJumperLabelWithValidation'
import { Validator, validate, validateAll } from '../helpers/Validator'

class UpdatePersonalInfo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      phone: '',
      isBlurred: {
        username: ''
      },
      isInvalidMsg: {
        username: false
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

  componentDidMount() {
    const user = this.props.user
    const username = user.username ? user.username : ''
    const phone = user.phone ? user.phone : ''
    this.setState({ 
      username: username,
      phone: phone
    })

    const form = document.querySelector('form.UpdatePersonalInfo')

    const doJump = (input) => {
      const label = input.previousElementSibling
      label.classList.add('jump')
      label.classList.remove('jumpCancel')
    }

    const addValuesFor = (nameValues = []) => {
      nameValues.forEach(nameValu => {
        const input = form.querySelector(`#${nameValu.name}`)
        input.value = [nameValu.value]
        doJump(input)
      })
    }

    const nameValues = []

    const checkAndAddToNameValues = (name, value) => {
      if (value) {
        nameValues.push( { name: name, value: value } )
      }
    }

    checkAndAddToNameValues('username', username)
    checkAndAddToNameValues('phone', phone)

    addValuesFor(nameValues)
  }

  handleSubmit(e) {
    e.preventDefault()
    const hasInvalidMsg = this.validateAll();
    if (!hasInvalidMsg && !this.props.user.isFetching) {
      const data = {}
      const { username, phone } = this.state
      data.username = username
      if (phone) {
        data.phone = phone
      }
      this.props.changePersonalInfoAction(data)
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

      <Form className='UpdatePersonalInfo w-40 mt-4'>
        <InputLabel 
          name='username'
          type='text'
          defaultValue={this.state.username}
          commonProps={commonProps}
        />
        <InputLabel
          name='phone' 
          type='text'
          defaultValue={this.state.phone}
          commonProps={commonProps}
        />
        <div className='d-flex justify-content-center mt-5'>
          <Button 
            type='submit'
            onClick={this.handleSubmit}
            >
            <ButtonContent 
              isFetching={this.props.user.isFetching}
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
        value = '';
    entries.forEach(entry => {
      name = entry.name
      value = entry.value
      isInvalidMsg[name] = ''
      switch (name) {
  
        case 'username':
          isInvalidMsg[name] = this.Validator.checkUsername(value)
          break;
        default:
          break
      }
    })
    return isInvalidMsg
  }
}


  
const mapstateToProps = (state) => {
  return {
    common: state.content.common,
    user: state.user
  }
}
  
export default connect(mapstateToProps, { changePersonalInfoAction })(UpdatePersonalInfo)