import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Form, FormGroup, Button, Input, Label, Col, Collapse } from 'reactstrap'

import 'react-datepicker/dist/react-datepicker.css'
import FilterForm from './inputs/FilterForm'
import ProposalItem from './proposal/ProposalItem'
import units from '../constants/units'
import InputWithJumperLabel from '../helpers/InputWithJumperLabel'
import DropdownInputWithJumperLabel from '../helpers/DropdownInputWithJumperLabel'
import YearPicker from './datePickers/YearPicker'
import MonthPicker from './datePickers/MonthPicker'
import DayPicker from './datePickers/DayPicker'
import ContinuousDatePicker from './datePickers/ContinuousDatePicker'
import { startAddNewProposalAction, addNewProposalAction } from '../actions/addNewProposalAction'
import InputLabel from './inputs/InputLabel'
import DropdownInputLabel from './inputs/DropdownInputLabel'
import DropdownListItemWithJumperLabel from '../helpers/DropdownListItemWithJumperLabel'

class AddNewEditProposal extends Component {

  constructor(props) {
    super(props)
    this.units = units
    this.state = {
      email: '',
      price: '',
      unit: '',
      available_quantity: '',
      phone: '',
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
    this.toggleIsPlanToHave = this.toggleIsPlanToHave.bind(this)
    this.clickOnRadio = this.clickOnRadio.bind(this)
    this.clickOnRadioContinuousType = this.clickOnRadioContinuousType.bind(this)
    this.validate = this.validate.bind(this)
    this.setNameValue = this.setNameValue.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.editMode) {
      const proposal = this.props.proposal

      const price = proposal.price, 
      unit = proposal.unit, 
      available_quantity = proposal.available_quantity, 
      email = proposal.email ? proposal.email : '', 
      phone = proposal.phone ? proposal.phone : '', 
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
        { name: 'available_quantity', value: available_quantity }        
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
      input.value = this.props.common.units[unit]
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
      const { isBlurred, isInvalidMsg, ...proposal } = this.state
      this.props.submit(proposal)
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
      onFocus: this.handleFocusOnDropdownInput,
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
          onFocus={this.handleFocusOnDropdownInput}
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
                  />
                  <DayPicker 
                    commonProps={commonPropsForDropdownInput}
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
                onClick={this.onSubmit}>
                {common.add}
              </Button>
            </Col>          
          </div>
        </div>
        
      </Form>
    )
  }

  validate(name, value) {
    const isInvalidMsg = this.msgCreator([{ name: name, value: value }])
    this.setState({
      isInvalidMsg: isInvalidMsg
    })
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

        case 'available_quantity':
          isInvalidMsg[name] = this.checkAvailableQuantity(value);
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
            isInvalidMsg.email = 'Email or Phone should not be empty'
          }

          break;

        case 'comment':
          isInvalidMsg[name] = this.checkComment(value);
          break;
        
        case 'plan_to_have_quantity':
          isInvalidMsg[name] = this.checkQuantity(value);
          break;

        case 'plan_to_have_price':
          isInvalidMsg[name] = this.checkPrice(value);
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

  checkAvailableQuantity(value) {
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

  checkQuantity(value) {
    let msg = '';
    if (value === '') {
      msg = 'Quantity should not be empty';
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
  return {
    common: state.content.common,
    cFF: state.content.Filter,
    email: state.user.email,
    isFetchingAddNew: state.proposals.isFetchingAddNew,
    startAddNewProposalAction: state.startAddNewProposalAction,
    addNewProposalAction: state.addNewProposalAction
  }
}

export default connect(mapStateToProps, { startAddNewProposalAction, addNewProposalAction })(AddNewEditProposal)