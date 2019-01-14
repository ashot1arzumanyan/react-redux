import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Form, FormGroup, Button, Input, Label, Collapse } from 'reactstrap'

import DemandItem from './demand/DemandItem'
import units from '../constants/units'
import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import YearPicker from './datePickers/YearPicker'
import MonthPicker from './datePickers/MonthPicker'
import DayPicker from './datePickers/DayPicker'
import ContinuousDatePicker from './datePickers/ContinuousDatePicker'
import InputLabel from './inputs/InputLabel'
import DropdownInputLabel from './inputs/DropdownInputLabel'
import DropdownListItemWithJumperLabel from '../helpers/DropdownListItemWithJumperLabel'
import FilterForm from './inputs/FilterForm'
import { Validator, validate, validateAll} from '../helpers/Validator'
import ButtonContent from './ButtonContent'

class AddNewEditDemand extends Component {

  constructor(props) {
    super(props)
    this.state = {
      price: '',
      unit: '',
      quantity: '',
      username: '',
      email: '',
      phone: '',
      description_one_word: '',
      comment: '',
      year: '',
      month: '',
      day: '',
      city: '',
      subType: '', 
      oneTime: true,
      continuous: false, 
      continuousType: 'day',
      frequencyNum: '',
      is_mark_the_date: false,

      isBlurred: {
        city: false,
        subType: false,
        price: false,
        unit: false,
        quantity: false,
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
        quantity: '',
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
    this.toggleIsMarkTheDate = this.toggleIsMarkTheDate.bind(this)
    this.clickOnRadio = this.clickOnRadio.bind(this)
    this.clickOnRadioContinuousType = this.clickOnRadioContinuousType.bind(this)
    this.setNameValue = this.setNameValue.bind(this)
    this.Validator = new Validator(this.props.cFF)
    this.validate = validate.bind(this)
    this.validateAll = validateAll.bind(this)
  }

  componentDidMount() {
    if (this.props.editMode) {
      const demand = this.props.demand
      const price = demand.price, 
      unit = demand.unit, 
      quantity = demand.quantity, 
      username = demand.username,
      email = demand.email ? demand.email : '', 
      phone = demand.phone ? demand.phone : '', 
      description_one_word = demand.description_one_word ? demand.description_one_word : '',
      comment = demand.comment ? demand.comment : '', 
      year = demand.is_mark_the_date ? demand.year : '', 
      month = demand.is_mark_the_date ? demand.month : '', 
      day = demand.is_mark_the_date && demand.day ? demand.day : '',
      region = demand.region,
      city = demand.city, 
      type = demand.type,
      subType = demand.subType,
      oneTime = demand.oneTime, 
      continuous = demand.continuous,
      continuousType = demand.continuous ? demand.continuousType : 'day',
      frequencyNum = demand.continuous ? demand.frequencyNum : '',
      is_mark_the_date = demand.is_mark_the_date

      this.setState({
        price: price, 
        unit: unit, 
        quantity: quantity, 
        username: username,
        email: email, 
        phone: phone, 
        comment: comment, 
        description_one_word: description_one_word,
        year: year, 
        month: month, 
        day: day, 
        region: region,
        city: city, 
        type: type,
        subType: subType,
        oneTime: oneTime, 
        continuous: continuous,
        continuousType: continuousType,
        frequencyNum: frequencyNum,
        is_mark_the_date: is_mark_the_date,
        date: demand.date,
        _id: demand._id,
        user_id: demand.user_id
      })
      
      const form = document.querySelector('form.add_demand');

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
        { name: 'quantity', value: quantity },
        { name: 'username', value: username }      
      ]

      const checkAndAddToNameValues = (name, value) => {
        if (value) {
          nameValues.push( { name: name, value: value } )
        }
      }

      checkAndAddToNameValues('email', email)
      checkAndAddToNameValues('phone', phone)
      checkAndAddToNameValues('comment', comment)
      checkAndAddToNameValues('description_one_word', description_one_word)
      checkAndAddToNameValues('year', year)
      checkAndAddToNameValues('month', month)
      checkAndAddToNameValues('day', day)
      checkAndAddToNameValues('frequencyNum', frequencyNum)

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

      if (continuous) { 
        form.querySelector('input[value="continuous"]').checked = true 
        if (continuousType === 'day') {
          form.querySelector('input[value="day"]').checked = true 
        } else if (continuousType === 'week') {
          form.querySelector('input[value="week"]').checked = true 
        } else {
          form.querySelector('input[value="month"]').checked = true 
        }
      } else {
        if (is_mark_the_date) {
          form.querySelector('#is_mark_the_date').checked = true 
        }
      }

    }
  }

  toggleIsMarkTheDate() {
    const isBlurred = { ...this.state.isBlurred }
    const isInvalidMsg = { ...this.state.isInvalidMsg }
    if (this.state.is_mark_the_date) {
      delete isBlurred.year
      delete isBlurred.month
      delete isInvalidMsg.year
      delete isInvalidMsg.month
      this.setState({
        is_mark_the_date: false,
        isBlurred: isBlurred,
        isInvalidMsg: isInvalidMsg
      })
    } else {
      isBlurred.year = false
      isBlurred.month = false
      isInvalidMsg.year = ''
      isInvalidMsg.month = ''
      this.setState({
        is_mark_the_date: true,
        isBlurred: isBlurred,
        isInvalidMsg: isInvalidMsg
      })
    }

  }

  clickOnRadio(e) {
    const value = e.target.value
    if (!this.state[value]) {
      const isBlurred = { ...this.state.isBlurred }
      const isInvalidMsg = { ...this.state.isInvalidMsg }
      if (value === 'continuous') {
        isBlurred.frequencyNum = false
        isInvalidMsg.frequencyNum = ''
        this.setState({
          oneTime: !this.state.oneTime,
          continuous: !this.state.continuous,
          isBlurred: isBlurred,
          isInvalidMsg: isInvalidMsg
        })
      } else {
        delete isBlurred.frequencyNum
        delete isInvalidMsg.frequencyNum
        this.setState({
          oneTime: !this.state.oneTime,
          continuous: !this.state.continuous,
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
    if (this.state.isBlurred[name]) {
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
      const { isBlurred, isInvalidMsg, ...demand } = this.state
      this.props.submit(demand)
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

    const { isBlurred, isInvalidMsg, ...demand } = this.state
    const { common, isFetchingAddNew } = this.props
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

      <Form className='add_demand'>
        <FilterForm 
          onClick={this.handleClickOnDropdownListItem}
          onBlur={this.handleBlurOnDropdownListItem}
          onInput={this.handleInputOnInput}
          setNameValue={this.setNameValue}
          isBlurred={isBlurred}
          isInvalidMsg={isInvalidMsg}
        />
        <div className="mt-4 d-flex justify-content-around">
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
                listName='units'
              />
              <InputLabel
                name='quantity' 
                type='number'
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
              <FormGroup className={this.state.oneTime ? '' : 'd-none'}>
                <FormGroup check >
                  <Label check>
                    <Input 
                      id='is_mark_the_date'
                      type="checkbox" 
                      onChange={this.toggleIsMarkTheDate} 
                    />{' '}
                    {common.mark_the_date}
                  </Label>
                </FormGroup>
                <Collapse isOpen={this.state.is_mark_the_date}>
                  <FormGroup className='d-flex'>
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
                </Collapse>
              </FormGroup>
              <FormGroup className={this.state.continuous ? '' : 'd-none'}>
                <ContinuousDatePicker 
                  commonProps={commonPropsForDropdownInput}
                  onClickOnRadioContinuousType={this.clickOnRadioContinuousType}
                  continuousType={this.state.continuousType}
                />
              </FormGroup>
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
                onClick={e => this.onSubmit(e)}>
                <ButtonContent 
                  isFetching={isFetchingAddNew}
                  content={common.add}
                />
              </Button>
            </Col>
          </div>
          <div className='position-relative w-50'>
            <div className='Demand proposal_demand_container position-fixed'>
              <DemandItem 
                demand={demand} 
                common={common}
                addNewMode={true}
              />
            </div>
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
  
        case 'quantity':
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
            this.setState({isBlurred: isBlurred})
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
            isBlurred.email = true;
            this.setState({isBlurred: isBlurred})
            isInvalidMsg.email = 'email_or_phone_not_empty'
          }
          break;
          
        case 'description_one_word':
          isInvalidMsg[name] = this.Validator.checkDescriptionOneWord(value);
          break;

        case 'comment':
          isInvalidMsg[name] = this.Validator.checkComment(value);
          break;

        case 'frequencyNum':
          isInvalidMsg[name] = this.Validator.checkFrequencyNum(value, this.state.continuousType)
          break;

        case 'month':
          isInvalidMsg[name] = this.Validator.checkMonth(value)
          break
        
        case 'year': 
          isInvalidMsg[name] = this.Validator.checkYear(value)
          break
        default:
          return isInvalidMsg;
      }
    })
    return isInvalidMsg
  }

}

const mapStateToProps = (state) => {
  return{
    common: state.content.common,
    cFF: state.content.Filter,
    user: state.user,
    isFetchingAddNew: state.demands.descriptions.isFetchingAddNew,
  }
}

export default connect(mapStateToProps)(AddNewEditDemand)