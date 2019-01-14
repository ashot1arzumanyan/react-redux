import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Button, Input, Label, Col, Collapse } from 'reactstrap'

import FilterForm from './inputs/FilterForm'
import ProposalItem from './proposal/ProposalItem'
import units from '../constants/units'
import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import YearPicker from './datePickers/YearPicker'
import MonthPicker from './datePickers/MonthPicker'
import DayPicker from './datePickers/DayPicker'
import ContinuousDatePicker from './datePickers/ContinuousDatePicker'
import InputLabel from './inputs/InputLabel'
import DropdownInputLabel from './inputs/DropdownInputLabel'
import DropdownListItemWithJumperLabel from '../helpers/DropdownListItemWithJumperLabel'
import ButtonContent from './ButtonContent'
import { Validator, validate, validateAll} from '../helpers/Validator'

class AddNewEditProposal extends Component {

  constructor(props) {
    super(props)
    this.units = units
    this.state = {
      email: '',
      price: '',
      unit: '',
      available_quantity: '',
      username: '',
      phone: '',
      description_one_word: '',
      comment: '',
      plan_to_have_quantity: '',
      plan_to_have_price: '',
      city: '',
      subType: '', 
      year: '',
      month: '',
      day: '',
      is_plan_to_have: false,
      oneTime: true,
      continuous: false, 
      continuousType: 'day',
      frequencyNum: '',
      isBlurred: {
        city: false,
        subType: false,
        price: false,
        unit: false,
        available_quantity: false,
        username: false,
        email: false,
        phone: false,
        comment: false,
      },
      isInvalidMsg: {
        city: '',
        subType: '',
        price: '',
        unit: '',
        available_quantity: '',
        username: '',
        email: '',
        phone: '',
        comment: '',
      }

    }

    this.handleFocusOnInput = this.handleFocusOnInput.bind(this)
    this.handleBlurOnInput = this.handleBlurOnInput.bind(this)
    this.handleInputOnInput = this.handleInputOnInput.bind(this)
    this.handleClickOnDropdownListItem = this.handleClickOnDropdownListItem.bind(this)
    this.handleBlurOnDropdownListItem = this.handleBlurOnDropdownListItem.bind(this)
    this.toggleIsPlanToHave = this.toggleIsPlanToHave.bind(this)
    this.clickOnRadio = this.clickOnRadio.bind(this)
    this.clickOnRadioContinuousType = this.clickOnRadioContinuousType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.setNameValue = this.setNameValue.bind(this)
    this.Validator = new Validator(this.props.cFF)
    this.validate = validate.bind(this)
    this.validateAll = validateAll.bind(this)
  }

  componentDidMount() {
    if (this.props.editMode) {
      const proposal = this.props.proposal

      const price = proposal.price, 
      unit = proposal.unit, 
      available_quantity = proposal.available_quantity, 
      username = proposal.username,
      email = proposal.email ? proposal.email : '', 
      phone = proposal.phone ? proposal.phone : '', 
      description_one_word = proposal.description_one_word ? proposal.description_one_word : '',
      comment = proposal.comment ? proposal.comment : '', 
      plan_to_have_quantity = proposal.is_plan_to_have ? proposal.plan_to_have_quantity : '', 
      plan_to_have_price = proposal.is_plan_to_have ? proposal.plan_to_have_price : '', 
      year = proposal.is_plan_to_have && proposal.oneTime ? proposal.year : '', 
      month = proposal.is_plan_to_have && proposal.oneTime ? proposal.month : '', 
      day = proposal.is_plan_to_have && proposal.oneTime && proposal.day ? proposal.day : '',
      region = proposal.region,
      city = proposal.city, 
      type = proposal.type,
      is_plan_to_have = proposal.is_plan_to_have,
      subType = proposal.subType,
      oneTime = proposal.oneTime, 
      continuous = proposal.continuous,
      continuousType = proposal.continuous ? proposal.continuousType : 'day',
      frequencyNum = proposal.continuous ? proposal.frequencyNum : '';

      this.setState({
        price: price, 
        unit: unit, 
        available_quantity: available_quantity, 
        username: username,
        email: email, 
        phone: phone, 
        description_one_word: description_one_word,
        comment: comment, 
        year: year, 
        month: month, 
        day: day, 
        region: region,
        city: city, 
        type: type,
        subType: subType,
        is_plan_to_have: is_plan_to_have,
        oneTime: oneTime, 
        continuous: continuous,
        continuousType: continuousType,
        frequencyNum: frequencyNum,
        plan_to_have_quantity: plan_to_have_quantity,
        plan_to_have_price: plan_to_have_price,
        date: proposal.date,
        _id: proposal._id,
        user_id: proposal.user_id
      })

      const form = document.querySelector('form.add_proposal');

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

      const nameValues = [
        { name: 'price', value: price },
        { name: 'available_quantity', value: available_quantity },
        { name: 'username', value: username }       
      ]

      const checkAndAddToNameValues = (name, value) => {
        if (value) {
          nameValues.push( { name: name, value: value } )
        }
      }

      checkAndAddToNameValues('email', email)
      checkAndAddToNameValues('phone', phone)
      checkAndAddToNameValues('description_one_word', description_one_word)
      checkAndAddToNameValues('comment', comment)
      checkAndAddToNameValues('year', year)
      checkAndAddToNameValues('month', month)
      checkAndAddToNameValues('day', day)
      checkAndAddToNameValues('frequencyNum', frequencyNum)
      checkAndAddToNameValues('plan_to_have_quantity', plan_to_have_quantity)
      checkAndAddToNameValues('plan_to_have_price', plan_to_have_price)

      addValuesFor( nameValues )

      const addValuesDataEnsForFilterForms = (nameValues) => {
        nameValues.forEach(nameValue => {
          const input = form.querySelector(`#${nameValue.name}`)
          input.dataset.en = nameValue.value
          input.value = this.props.cFF[nameValue.listName][nameValue.value]
          doJump(input)
        })
      }

      const nameValuesFormFilter = [
        { name: 'region', listName: 'regions', value: region },
        { name: 'city', listName: 'cities', value: city },
        { name: 'type', listName: 'types', value: type },
        { name: 'subType', listName: 'subTypes', value: subType },
      ]

      addValuesDataEnsForFilterForms( nameValuesFormFilter )

      const input = form.querySelector('#unit')
      input.dataset.en = unit
      input.value = this.props.cFF.units[unit]
      doJump(input)

      if (is_plan_to_have) {
        form.querySelector('#is_plan_to_have').checked = true
        if (continuous) { 
          form.querySelector('input[value="continuous"]').checked = true 
          if (continuousType === 'day') {
            form.querySelector('input[value="day"]').checked = true 
          } else if (continuousType === 'week') {
            form.querySelector('input[value="week"]').checked = true 
          } else {
            form.querySelector('input[value="month"]').checked = true 
          }
        }    
      }
    }
  }

  clickOnRadio(e) {
    const value = e.target.value
    if (!this.state[value]) {
      const isBlurred = { ...this.state.isBlurred }
      const isInvalidMsg = { ...this.state.isInvalidMsg }
      if (value === 'continuous') {
        delete isBlurred.year
        delete isBlurred.month
        delete isInvalidMsg.year
        delete isInvalidMsg.month
        isBlurred.frequencyNum = false
        isInvalidMsg.frequencyNum = ''
        this.setState({
          oneTime: false,
          continuous: true,
          isBlurred: isBlurred,
          isInvalidMsg: isInvalidMsg
        })        
      } else {
        delete isBlurred.frequencyNum
        delete isInvalidMsg.frequencyNum
        isBlurred.year = false
        isBlurred.month = false
        isInvalidMsg.year = ''
        isInvalidMsg.month = ''
        this.setState({
          oneTime: true,
          continuous: false,
          isBlurred: isBlurred,
          isInvalidMsg: isInvalidMsg
        })  
      }

    } 
  }

  clickOnRadioContinuousType(e) {
    const value = e.target.value;
    this.setState({
      continuousType: value,
    })
  }

  toggleIsPlanToHave() {
    const isBlurred = { ...this.state.isBlurred }
    const isInvalidMsg = { ...this.state.isInvalidMsg }
    if (!this.state.is_plan_to_have) {
      isBlurred.plan_to_have_price = false
      isBlurred.plan_to_have_quantity = false
      isInvalidMsg.plan_to_have_price = ''
      isInvalidMsg.plan_to_have_quantity = ''
      if (this.state.oneTime) {
        isBlurred.year = false
        isBlurred.month = false
        isInvalidMsg.year = ''
        isInvalidMsg.month = ''
      } else {
        isBlurred.frequencyNum = false
        isInvalidMsg.frequencyNum = ''
      }
      this.setState({ 
        is_plan_to_have: true,
        isBlurred: isBlurred,
        isInvalidMsg: isInvalidMsg 
      })      
    } else {
      delete isBlurred.plan_to_have_price
      delete isBlurred.plan_to_have_quantity
      delete isInvalidMsg.plan_to_have_price
      delete isInvalidMsg.plan_to_have_quantity
      delete isBlurred.year
      delete isBlurred.month
      delete isInvalidMsg.year
      delete isInvalidMsg.month
      delete isBlurred.frequencyNum
      delete isInvalidMsg.frequencyNum
      this.setState({
        is_plan_to_have: false,
        isBlurred: isBlurred,
        isInvalidMsg: isInvalidMsg
      })
    }
  }

  handleFocusOnInput(e) {
    const input = new InputWithJumperLabel(e)
    input.focus()
    const { name, value } = input.getNameValue()
    if(name === 'username' || name === 'email' || name === 'phone') {
      if (this.props.user[name] && !value) {
        this.setNameValue(name, this.props.user[name])
        input.setValue(this.props.user[name])
      }
    }
  }

  handleBlurOnInput(e) {
    const input = new InputWithJumperLabel(e)
    input.blur()
    const { name, value } = input.getNameValue()
    this.setIsBlurredTrue(name)
    this.validate(name, value)
  }

  handleInputOnInput(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    const datasetEn = input.getDatasetEn()
    if(this.state.isBlurred[name]) {
      this.validate(name, value)
    }
    this.setNameValue(name, datasetEn || value)
  }

  handleClickOnDropdownListItem(e) {
    const listItem = new DropdownListItemWithJumperLabel(e)
    listItem.click()
  }

  handleBlurOnDropdownListItem(e) {
    const input = new InputWithJumperLabel(e)
    const { name, value } = input.getNameValue()
    this.setIsBlurredTrue(name)
    this.validate(name, value)
  }

  onSubmit(e) {
    e.preventDefault()
    const hasInvalidMsg = this.validateAll()
    if (!hasInvalidMsg && !this.props.isFetchingAddNew) {
      const { isBlurred, isInvalidMsg, ...proposal } = this.state
      this.props.submit(proposal)
    }  
  }

  setIsBlurredTrue(name) {
    const isBlurred = { ...this.state.isBlurred }
    isBlurred[name] = true
    this.setState({ isBlurred: isBlurred })
  }

  setNameValue(name, value) {
    this.setState({
      [name]: value
    })
  }

  render() {

    const { common, isFetchingAddNew } = this.props
    const { isInvalidMsg, isBlurred, ...proposal } = this.state

    const commonPropsForInput = {
      onFocus: this.handleFocusOnInput,
      onBlur: this.handleBlurOnInput,
      onInput: this.handleInputOnInput,
      isBlurred: isBlurred,
      isInvalidMsg: isInvalidMsg
    }

    const commonPropsForDropdownInput = {
      onClick: this.handleClickOnDropdownListItem,
      onBlur: this.handleBlurOnDropdownListItem,
      onInput: this.handleInputOnInput,
      setNameValue: this.setNameValue,
      isBlurred: isBlurred,
      isInvalidMsg: isInvalidMsg
    }
    
    return (
      <Form className='add_proposal'>
        <FilterForm 
          onClick={this.handleClickOnDropdownListItem}
          onBlur={this.handleBlurOnDropdownListItem}
          onInput={this.handleInputOnInput}
          setNameValue={this.setNameValue}
          isBlurred={isBlurred}
          isInvalidMsg={isInvalidMsg}
        />
        <div className="mt-4 d-flex justify-content-around">
          <div className='position-relative w-50'>
            <div className='Proposal proposal_demand_container position-fixed'>
              <ProposalItem 
                proposal={proposal}
                common={common}
                addNewMode={true}
              />              
            </div>
          </div>
          <div className='w-50'>
            <Col className="mx-auto my-4">
              <InputLabel
                name='price' 
                type='number'
                commonProps={commonPropsForInput}
              />
              <DropdownInputLabel 
                name='unit'
                type='text'
                commonProps={commonPropsForDropdownInput}
                list={units}
                listName={'units'}
              />
              <InputLabel
                name='available_quantity' 
                type='number'
                commonProps={commonPropsForInput}
              />
              <FormGroup check className='mb-3'>
                <Label check>
                  <Input 
                    id='is_plan_to_have'
                    type="checkbox" 
                    onChange={this.toggleIsPlanToHave} 
                  />{' '}
                  {common.plan_to_have}
                </Label>
              </FormGroup>
              <Collapse isOpen={this.state.is_plan_to_have}>
                <InputLabel
                  name='plan_to_have_quantity' 
                  type='number'
                  contentName='quantity'
                  commonProps={commonPropsForInput}
                />
                <InputLabel
                  name='plan_to_have_price' 
                  type='number'
                  contentName='price'
                  commonProps={commonPropsForInput}
                />
                <FormGroup className='d-flex'>
                  <FormGroup check className='mr-5'>
                    <Label check>
                      <Input 
                        type='radio'
                        name='plan_to_have_radio'
                        value='oneTime'
                        defaultChecked='true'
                        onClick={this.clickOnRadio}
                      />
                      {common.oneTime}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input 
                        type='radio'
                        name='plan_to_have_radio'
                        value='continuous'
                        onClick={this.clickOnRadio}
                      />   
                      {common.continuous}
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup className={this.state.oneTime ? 'd-flex' : 'd-none'}>
                  <YearPicker  
                    commonProps={commonPropsForDropdownInput}
                  />
                  <MonthPicker 
                    commonProps={commonPropsForDropdownInput}
                    year={this.state.year}
                  />
                  <DayPicker 
                    onBlur={this.handleBlurOnDropdownListItem}
                    onInput={this.handleInputOnInput}
                    onClick={this.handleClickOnDropdownListItem}
                    year={this.state.year}
                    month={this.state.month}
                  />
                </FormGroup>
                <FormGroup className={this.state.continuous ? '' : 'd-none'}>
                  <ContinuousDatePicker 
                    commonProps={commonPropsForDropdownInput}
                    onClickOnRadioContinuousType={this.clickOnRadioContinuousType}
                    continuousType={this.state.continuousType}
                  />
                </FormGroup>
              </Collapse>
              <InputLabel
                name='username' 
                type='text'
                commonProps={commonPropsForInput}
              />
              <InputLabel
                name='email' 
                type='text'
                commonProps={commonPropsForInput}
              />
              <InputLabel
                name='phone' 
                type='text'
                commonProps={commonPropsForInput}
              />
              <InputLabel
                name='description_one_word' 
                type='text'
                commonProps={commonPropsForInput}
              />
              <InputLabel
                name='comment' 
                type='textarea'
                commonProps={commonPropsForInput}
              />
              <Button 
                onClick={this.onSubmit}>
                <ButtonContent 
                  isFetching={isFetchingAddNew}
                  content={common.add}
                />
              </Button>
            </Col>          
          </div>
        </div>
        
      </Form>
    )
  }

  msgCreator(entries = []) {
    const isInvalidMsg = {...this.state.isInvalidMsg};
    const isBlurred = {...this.state.isBlurred};
    let emailMsg = '', 
        phoneMsg = '',
        name = '',
        value = ''
    entries.forEach(entry => {
      name = entry.name
      value = entry.value.trim().toLowerCase();
      switch (name) {
        case 'city':
          isInvalidMsg[name] = this.Validator.checkCity(value);
          break;

        case 'subType':
          isInvalidMsg[name] = this.Validator.checkSubType(value);
          break;
        
        case 'price':
          isInvalidMsg[name] = this.Validator.checkIsNotEmpty(value);
          break;

        case 'unit':
          isInvalidMsg[name] = this.Validator.checkUnit(value);
          break;

        case 'available_quantity':
          isInvalidMsg[name] = this.Validator.checkIsNotEmpty(value);
          break;

        case 'username':
          isInvalidMsg[name] = this.Validator.checkUsername(value);
          break;
  
        case 'email':
          const phone = document.querySelector('input[name="phone"]');
          emailMsg = this.Validator.checkEmail(value);
          phoneMsg = this.Validator.checkIsNotEmpty(phone.value);
          if (emailMsg === '' || phoneMsg === '') {
            isInvalidMsg.phone = '';
            isInvalidMsg[name] = '';
          } else {
            isInvalidMsg[name] = emailMsg;
            isBlurred.phone = true;
            isInvalidMsg.phone = 'email_or_phone_not_empty';
          }
          break;

        case 'phone':
          const email = document.querySelector('input[name="email"]');
          phoneMsg = this.Validator.checkIsNotEmpty(value);
          emailMsg = this.Validator.checkEmail(email.value);
          if (phoneMsg === '' || emailMsg === '') {
            isInvalidMsg[name] = '';
            isInvalidMsg.email = '';
          } else {
            isInvalidMsg[name] = phoneMsg;
            isInvalidMsg.email = 'email_or_phone_not_empty'
          }
          break;

        case 'description_one_word':
          isInvalidMsg[name] = this.Validator.checkDescriptionOneWord(value);
          break;
        
        case 'comment':
          isInvalidMsg[name] = this.Validator.checkComment(value);
          break;
        
        case 'plan_to_have_quantity':
          isInvalidMsg[name] = this.Validator.checkIsNotEmpty(value);
          break;

        case 'plan_to_have_price':
          isInvalidMsg[name] = this.Validator.checkIsNotEmpty(value);
          break;

        case 'frequencyNum':
          isInvalidMsg[name] = this.Validator.checkFrequencyNum(value, this.state.continuousType)
          break;

        case 'month':
          isInvalidMsg[name] = this.Validator.checkMonth(value)
          break;
        
        case 'year': 
          isInvalidMsg[name] = this.Validator.checkYear(value)
          break
        default: 
          return isInvalidMsg
      }
    })
    return isInvalidMsg
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.content.common,
    cFF: state.content.Filter,
    user: state.user,
    isFetchingAddNew: state.proposals.descriptions.isFetchingAddNew,
  }
}

export default connect(mapStateToProps)(AddNewEditProposal)