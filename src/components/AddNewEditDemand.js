import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Col, Form, FormGroup, Button, Input, Label, Collapse } from 'reactstrap'

import DemandItem from './demand/DemandItem'
import units from '../constants/units'
import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import DropdownInputWithJumperLabel from '../helpers/DropdownInputWithJumperLabel'
import YearPicker from './datePickers/YearPicker'
import MonthPicker from './datePickers/MonthPicker'
import DayPicker from './datePickers/DayPicker'
import ContinuousDatePicker from './datePickers/ContinuousDatePicker'
import InputLabel from './inputs/InputLabel'
import DropdownInputLabel from './inputs/DropdownInputLabel'
import DropdownListItemWithJumperLabel from '../helpers/DropdownListItemWithJumperLabel'
import FilterForm from './inputs/FilterForm'

class AddNewEditDemand extends Component {

  constructor(props) {
    super(props)
    this.state = {
      price: '',
      unit: '',
      quantity: '',
      email: '',
      phone: '',
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
        email: '',
        phone: '',
        comment: '',
      }
    }

    this.handleFocusOnInput = this.handleFocusOnInput.bind(this)
    this.handleBlurOnInput = this.handleBlurOnInput.bind(this)
    this.handleInputOnInput = this.handleInputOnInput.bind(this)
    this.handleFocusOnDropdownInput = this.handleFocusOnDropdownInput.bind(this)
    this.handleClickOnDropdownListItem = this.handleClickOnDropdownListItem.bind(this)
    this.handleBlurOnDropdownListItem = this.handleBlurOnDropdownListItem.bind(this)
    this.toggleIsMarkTheDate = this.toggleIsMarkTheDate.bind(this)
    this.clickOnRadio = this.clickOnRadio.bind(this)
    this.clickOnRadioContinuousType = this.clickOnRadioContinuousType.bind(this)
    this.validateAll = this.validateAll.bind(this)
    this.validate = this.validate.bind(this)
    this.setNameValue = this.setNameValue.bind(this)
  }

  componentDidMount() {
    if (this.props.editMode) {

      const demand = this.props.demand
      
      const price = demand.price, 
      unit = demand.unit, 
      quantity = demand.quantity, 
      email = demand.email ? demand.email : '', 
      phone = demand.phone ? demand.phone : '', 
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
        email: email, 
        phone: phone, 
        comment: comment, 
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

      function doJump(input) {
        const parent = input.parentElement
        parent.classList.add('jump')
        parent.classList.remove('jumpCancel')
      }

      function addValuesFor(nameValues = []) {
        nameValues.forEach(nameValu => {
          const input = form.querySelector(`#${nameValu.name}`)
          input.value = [nameValu.value]
          doJump(input)
        })
      }

      const nameValues = [
        { name: 'price', value: price },
        { name: 'quantity', value: quantity }        
      ]

      function checkAndAddToNameValues(name, value) {
        if (value) {
          nameValues.push( { name: name, value: value } )
        }
      }

      checkAndAddToNameValues('email', email)
      checkAndAddToNameValues('phone', phone)
      checkAndAddToNameValues('comment', comment)
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
      input.value = this.props.common.units[unit]
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

  handleFocusOnDropdownInput(e) {
    const input = new DropdownInputWithJumperLabel(e)
    input.focus()
  }

  handleClickOnDropdownListItem(e) {
    const listItem = new DropdownListItemWithJumperLabel(e)
    listItem.click()
    const input = listItem.getInput()
    this.setIsInvalidMsgByNameToEmpty(input.name)
  }

  handleBlurOnDropdownListItem(e) {
    const input = new InputWithJumperLabel(e)
    if (input.checkListIsClosed()) {
      const { name, value } = input.getNameValue()
      this.setIsBlurredTrue(name)
      this.validate(name, value)
    }
  }  

  onSubmit(e) {
    e.preventDefault()
    const hasInvalidMsg = this.validateAll()
    if (!hasInvalidMsg) {
      const { isBlurred, isInvalidMsg, ...demand } = this.state
      this.props.submit(demand)
    }  
  }

  setIsBlurredTrue(name) {
    const isBlurred = { ...this.state.isBlurred }
    isBlurred[name] = true
    this.setState({ isBlurred: isBlurred })
  }

  setIsInvalidMsgByNameToEmpty(name) {
    const isInvalidMsg = { ...this.state.isInvalidMsg }
    isInvalidMsg[name] = ''
    this.setState({ isInvalidMsg: isInvalidMsg })
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
      onFocus: this.handleFocusOnDropdownInput,
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
          onFocus={this.handleFocusOnDropdownInput}
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
                    />
                    <DayPicker 
                      commonProps={commonPropsForDropdownInput}
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
                name='comment' 
                type='textarea'
                commonProps={commonPropsForInput}
              />
              <Button 
                disabled={isFetchingAddNew}
                onClick={e => this.onSubmit(e)}>
                {common.add}
              </Button>
            </Col>
          </div>
          <div className='position-relative w-50'>
            <div className='Demand proposal_demand_container position-fixed'>
              <DemandItem 
                demand={demand} 
              />
            </div>
          </div>
        </div>
      </Form>
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
    const isInvalidMsg = this.msgCreator([{ name: name, value: value }])
    this.setState({ isInvalidMsg: isInvalidMsg })
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
          isInvalidMsg[name] = this.checkCity(value);
          break;
          
        case 'subType':
          isInvalidMsg[name] = this.checkSubType(value);
          break;
          
        case 'price':
          isInvalidMsg[name] = this.checkPrice(value);
          break;
  
        case 'unit':
          isInvalidMsg[name] = this.checkUnit(value);
          break;
  
        case 'quantity':
          isInvalidMsg[name] = this.checkQuantity(value);
          break;
  
        case 'email':
          const phone = document.querySelector('input[name="phone"]');
          emailMsg = this.checkEmail(value);
          phoneMsg = this.checkPhone(phone.value);
          if (emailMsg === '' || phoneMsg === '') {
            isInvalidMsg.phone = '';
            isInvalidMsg[name] = '';
          } else {
            isInvalidMsg[name] = emailMsg;
            isBlurred.phone = true;
            this.setState({isBlurred: isBlurred})
            isInvalidMsg.phone = 'Phone or Email should not be empty';
          }
          break;
  
        case 'phone':
          const email = document.querySelector('input[name="email"]');
          phoneMsg = this.checkPhone(value);
          emailMsg = this.checkEmail(email.value);
          if (phoneMsg === '' || emailMsg === '') {
            isInvalidMsg[name] = '';
            isInvalidMsg.email = '';
          } else {
            isInvalidMsg[name] = phoneMsg;
            isBlurred.email = true;
            this.setState({isBlurred: isBlurred})
            isInvalidMsg.email = 'Email or Phone should not be empty'
          }
          break;
  
        case 'comment':
          isInvalidMsg[name] = this.checkComment(value);
          break;

        case 'frequencyNum':
          isInvalidMsg[name] = this.checkFrequencyNum(value)
          break;

        case 'month':
          isInvalidMsg[name] = this.checkMonth(value)
          break;
        
        case 'year': 
          isInvalidMsg[name] = this.checkYear(value)
      }
    })
    return isInvalidMsg
  }

  checkCity(value) {
    let msg = '';
    if (value === '') {
      msg = 'City field most be chose from on of the opened list above'
      return msg
    }
    const cities = Object.values(this.props.cFF.cities).map(value => value.toLowerCase());
    if (cities.indexOf(value) === -1) {
      msg = 'City field most be chose from on of the opened list above'
    }
    return msg;
  }

  checkSubType(value) {
    let msg = '';
    if (value === '') {
      msg = 'subType field most be chose from on of the opened list above'
      return msg
    }
    const subTypes = Object.values(this.props.cFF.subTypes).map(value => value.toLowerCase());
    if (subTypes.indexOf(value) === -1) {
      msg = 'subType field most be chose from on of the opened list above'
    }
    return msg;
  }

  checkUnit(value) {
    let msg = '';
    if (value === '') {
      msg = 'Unit should not be empty and most be chose from on of the opened list above'
    }
    const units = Object.values(this.props.common.units);
    if (units.indexOf(value) === -1) {
      msg = 'Unit most be chose from on of the opened list above'
    }
    return msg;
  }

  checkPrice(value) {
    let msg = '';
    if (value === '') {
      msg = 'Price should not be empty'
    }
    return msg;
  }

  checkQuantity(value) {
    let msg = '';
    if (value === '') {
      msg = 'Available quantity should not be empty'
    }
    return msg;
  }

  checkEmail(value) {
    let msg = '';
    const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === '') {
      msg = 'Email or Phone should not be empty';
    } else if (!emailRe.test(value)) {
      msg = 'Email is not correct';
    }
    return msg
  }

  checkPhone(value) {
    let msg = '';
    if (value === '') {
      msg = 'Phone should not be empty';
    } 
    return msg
  }

  checkComment(value) {
    let msg = '';
    if (value.length > 199) {
      msg = 'This is a maximum size';
    } 
    return msg
  }

  checkFrequencyNum(value) {
    let msg = '';
    if (value === '') {
      msg = '???? should not be empty and most be chose from on of the opened list above'
      return msg
    }
    const continuousType = this.state.continuousType
    let values = []
    if (continuousType ==='day') {
      values = ['1', '2', '3', '4', '5', '6']
    } else if (continuousType === 'week') {
      values = ['1', '2', '3']
    } else {
      values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
    if (values.indexOf(value) === -1) {
      msg = '??? most be chose from on of the opened list above'
    }
    return msg
  }

  checkMonth(value) {
    let msg = ''
    if (value === '') {
      return msg = 'Month field should not be empty'
    }
    const months = moment().localeData().months()
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    if (numbers.indexOf(value) === -1 && months.indexOf(value) === -1) {
      msg = 'Ամիս դաշտը պետք է ընտրված լինի ներքևում բացված ցուցակից կամ դրան համապատասխան թիվ մուտքագրվի'
    }
    return msg 
  }

  checkYear(value) {
    let msg = ''
    if (value === '') {
      return msg = 'Year field should not be empty'
    }
    const currentYear = new Date().getFullYear();
    const years = []
    for (let year = currentYear; year < currentYear + 31; year++) {
      years.push(String(year))
    }
    if (years.indexOf(value) === -1) {
      msg = 'Տարի դաշտը պետք է համապատասխանի ներքևում բացված ցուցակի որևե անդամի հետ'
    }
    return msg
  }

}

const mapStateToProps = (state) => {
  return{
    common: state.content.common,
    cFF: state.content.Filter,
    email: state.user.email,
    isFetchingAddNew: state.demands.isFetchingAddNew,
  }
}

export default connect(mapStateToProps)(AddNewEditDemand)