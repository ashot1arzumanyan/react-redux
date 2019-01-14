import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, ListGroup, Badge } from 'reactstrap'

import regions from '../constants/regions'
import regions_cities from '../constants/regions_cities'
import types from '../constants/types'
import types_subTypes from '../constants/types_subTypes'

import { addFilter, deleteFilter } from '../actions/filterByAction'
import getStatementsAction from '../actions/getStatementsAction'
import { regionFiltersSumOfAction, cityFiltersSumOfAction, typeFiltersSumOfAction } from '../actions/filtersSumOfAction'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.counts = {
      region: {
        proposal: '',
        demand: ''
      },
      city: {
        proposal: '',
        demand: ''
      },
      type: {
        proposal: '',
        demand: ''
      },
      subType: {
        proposal: '',
        demand: ''
      }
    }
    this.state = {
      regions: [],
      regions_cities: [],
      types: [],
      types_subTypes: [],
      resetBtns: {
        region: false,
        city: false,
        type: false,
        subType: false
      },
      openList: {
        region: false,
        city: false,
        type: false,
        subType: false
      }
    }

    this.focus = this.focus.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.clickOnRegion = this.clickOnRegion.bind(this)
    this.clickOnCity = this.clickOnCity.bind(this)
    this.clickOnType = this.clickOnType.bind(this)
    this.clickOnSubType = this.clickOnSubType.bind(this)
    this.checkGetStatementsFilterSumOf = this.checkGetStatementsFilterSumOf.bind(this)
    this.setFilter = this.setFilter.bind(this)
    this.checkResetBtn = this.checkResetBtn.bind(this)
    this.checkAndSetCounts = this.checkAndSetCounts.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
    this.resetValue = this.resetValue.bind(this)
  }

  componentDidMount() {
    this.setState({
      regions: regions,
      regions_cities: regions_cities,
      types: types,
      types_subTypes: types_subTypes,
    })
  }

  mouseOver(e) {
    const target = e.target;
    target.focus();
    const listenEnterUpDown = (() => {
      let selected = -1;
      return function(e) {
          const lies = e.target.parentElement.querySelectorAll('li');
          if (!lies.length || selected > lies.length - 1) {
              selected = -1;
              return
          }
          // if (e.keyCode === 9) {
          //     return
          // }
          if(e.keyCode === 40) {
              if (selected < lies.length - 1) {
                  if (lies[selected]) {
                      lies[selected].classList.remove('hovered_list_item') 
                  }
                  selected += 1;
                  if (lies[selected]) {
                      lies[selected].classList.add('hovered_list_item') 
                      lies[selected].scrollIntoView({block: 'end'})
                  }
              }
          } else if (e.keyCode === 38) {
              if (selected > 0) {
                  if (lies[selected]) {
                      lies[selected].classList.remove('hovered_list_item') 
                  }
                  selected -= 1;
                  if (lies[selected]) {
                      lies[selected].classList.add('hovered_list_item') 
                      lies[selected].scrollIntoView({block: 'end'})
                  }
              }
          } else if (e.keyCode === 13) {
              if (selected >= 0) {
                  // const input = e.target.parentElement.querySelector('input')
                  // input.value = lies[selected].innerText
                  const evn = new Event('click', { bubbles: true })
                  lies[selected].dispatchEvent(evn)
                  // e.target.parentElement.dispatchEvent(new Event('mouseleave', {bubbles: true}))
                  // selected = 0
                  // lies[selected].classList.remove('hovered_list_item') 
                  // e.target.removeEventListener('keyup', listenEnterUpDown);
              }
          } else {
              if (lies[selected]) {
                  lies[selected].classList.remove('hovered_list_item') 
              }
              selected = -1
          }
      }
  })();
    const hideEl = (ev) => {                                                                                                                                     
      const target = ev.target;
      const input = target.querySelector('input'); 
      // const ul = target.querySelector('ul');                                                                                                                  
      input.blur();                                                                                                                         
      // ul.style.display = 'none';
      const openList = { ...this.state.openList };
      openList[input.name] = false;
      this.setState({ 
        openList: openList  
      })
      input.removeEventListener('keyup', listenEnterUpDown);
      target.removeEventListener('mouseleave', hideEl); 
    }                                                                                                                                                            
    target.parentElement.addEventListener('mouseleave', hideEl);
    target.removeEventListener('keyup', listenEnterUpDown);
    target.addEventListener('keyup', listenEnterUpDown);
  }

  focus(target) {
    const openList = { ...this.state.openList };
    openList[target.name] = true;
    this.setState({ 
      openList: openList  
    })
    // target.parentElement.querySelector('ul').style.display = 'block'; 
  }

  handleInput(target) {
    const value = target.value.toLowerCase();
    const name = target.name;
    if (!value) {
      this.props.deleteFilter(name);
      this.props.resetCounts(name);
    }
    if (name === 'region') {
      return this.filterRegion(value)
    } else if (name === 'city') {
      return this.filterCity(value)
    } else if (name === 'type') {
      return this.filterType(value)
    } else if (name === 'subType') {
      return this.filterSubType(value)
    }
  }

  checkGetStatementsFilterSumOf(filterSumOf) {
    const { p, d, getStatementsAction } = this.props
    if (p.skip !== 0 && d.skip !== 0 && ((p.skip < p.count && !p.isFetchingGet) || (d.skip < d.count && !d.isFetchingGet))) {
      setTimeout(() => {        
        getStatementsAction(
          p.skip, 
          p.linkToCachedAll, 
          d.skip, 
          d.linkToCachedAll,
          filterSumOf, 
        )
      }, 100);
    } else {
      if (filterSumOf) filterSumOf()
    }
  }

  clickOnRegion(e) {
    this.setInputValue(e.target);
    this.filterCityByRegion(e.target.dataset.en);
    this.checkGetStatementsFilterSumOf(this.props.regionFiltersSumOfAction);
  }

  clickOnCity(e) {
    this.setInputValue(e.target);
    this.checkGetStatementsFilterSumOf(this.props.cityFiltersSumOfAction);
  }

  clickOnType(e) {
    this.setInputValue(e.target);
    this.filterSubTypeByType(e.target.dataset.en);
    this.checkGetStatementsFilterSumOf(this.props.typeFiltersSumOfAction);
  }

  clickOnSubType(e) {
    this.setInputValue(e.target);
    this.checkGetStatementsFilterSumOf(null)
  }

  setInputValue(target) {
    const input = target.parentElement.previousElementSibling
    const currentEn = target.dataset.en;                                                                                                 
    this.props.addFilter({[input.name]: currentEn});
    const value = target.firstChild.data;
    this.setFilter(input.name)
    input.value = value;
    input.dataset.en = currentEn;
    const countsSpans = target.children[0].children;
    this.props.setCounts(countsSpans[0].innerText, countsSpans[1].innerText);
    this.counts[input.name] = {
      proposal: countsSpans[0].innerText,
      demand: countsSpans[1].innerText
    }
  }

  setFilter(param) {
    const resetBtns = { ...this.state.resetBtns }
    let listsToSetDefault = {}
    resetBtns[param] = true
    switch (param) {
      case 'region':
        resetBtns.city = this.checkResetBtn('city')
        resetBtns.type = this.checkResetBtn('type')
        resetBtns.subType = this.checkResetBtn('subType')
        listsToSetDefault = {
          regions_cities: regions_cities,
          types: types,
          types_subTypes: types_subTypes
        }
        break;
      case 'city':
        resetBtns.type = this.checkResetBtn('type')
        resetBtns.subType = this.checkResetBtn('subType')
        listsToSetDefault = {
          types: types,
          types_subTypes: types_subTypes
        }
        break;
      case 'type': 
        resetBtns.subType = this.checkResetBtn('subType')
        listsToSetDefault = {
          types_subTypes: types_subTypes
        }
        break;
      default:
        break;
    }
    this.setState({ 
      resetBtns: resetBtns, 
      ...listsToSetDefault
    })
  }

  resetValue(e) {
    const input = e.target.nextElementSibling;
    input.value = '';
    this.resetFilter(input.name);
  }

  resetFilter(param) {
    this.props.deleteFilter(param);
    const resetBtns = { ...this.state.resetBtns };
    const openList = { ...this.state.openList };
    let listsToSetDefault = {};
    resetBtns[param] = false;
    openList[param] = false;
    switch(param) {
      case 'region':
        resetBtns.city = this.checkResetBtn('city');
        resetBtns.type = this.checkResetBtn('type');
        resetBtns.subType = this.checkResetBtn('subType');
        listsToSetDefault = {
          regions: regions,
          regions_cities: regions_cities,
          types: types,
          types_subTypes: types_subTypes,
        };
        this.props.resetCounts();
        break;
      case 'city':
      resetBtns.type = this.checkResetBtn('type');
      resetBtns.subType = this.checkResetBtn('subType');
        listsToSetDefault = {
          regions_cities: regions_cities,
          types: types,
          types_subTypes: types_subTypes,
        }
        this.checkAndSetCounts('city')
        break;
      case 'type':
        resetBtns.subType = this.checkResetBtn('subType');
        listsToSetDefault = {
          types: types,
          types_subTypes: types_subTypes,
        }
        this.checkAndSetCounts('type')
        break;
      case 'subType':
        listsToSetDefault = {
          types_subTypes: types_subTypes,
        }
        this.checkAndSetCounts('subType')
        break;
      default:
        break
    }
    this.setState({
      resetBtns: resetBtns,
      openList: openList,
      ...listsToSetDefault
    })
  }

  checkResetBtn(listName) {
    const resetBtns = { ...this.state.resetBtns }
    if (resetBtns[listName]) {
      resetBtns[listName] = false
      this.props.deleteFilter(listName)
    }
    setTimeout(() => {
      document.querySelector(`input[name=${listName}]`).value = '';
    }, 0);
    return resetBtns[listName]
  }

  checkAndSetCounts(name) {
    const resetBtns = { ...this.state.resetBtns }
    let listOfNames = [];
    switch(name) {
      case 'city':
        listOfNames = ['region']
        break;
      case 'type':
        listOfNames = ['city', 'region']
        break;
      case 'subType':
        listOfNames = ['type', 'city', 'region']
        break;
      default:
        break
    }
    const isTruty = listOfNames.some(n => {
      if (resetBtns[n]) {
        this.props.setCounts(this.counts[n].proposal, this.counts[n].demand)
        return true
      }
      return false
    })
    if (!isTruty) {
      this.props.resetCounts()
    }
  }

  filterRegion(value) {
    const content = this.props.content.regions;
    const matched = regions.filter(o => {
      return o.includes(value) || content[o].toLowerCase().includes(value)
    })
    this.setState({
      regions: matched
    })
  }

  filterType(value) {
    const content = this.props.content.types;
    const matched = types.filter(o => {
      return o.includes(value) || content[o].toLowerCase().includes(value)
    })
    this.setState({
      types: matched
    })
  }

  filterCity(value) {
    const cities = this.props.content.cities;
    const matchedCities = regions_cities.filter(region_city => {
      return region_city.city.includes(value) || cities[region_city.city].toLowerCase().includes(value)
    })
    this.setState({regions_cities: matchedCities})
  }

  filterSubType(value) {
    const subTypes = this.props.content.subTypes;
    const matchedSubTypes = types_subTypes.filter(type_subType => {
      return type_subType.subType.includes(value) || subTypes[type_subType.subType].toLowerCase().includes(value)
    })
    this.setState({types_subTypes: matchedSubTypes})
  }

  filterCityByRegion(region) {
    const matchedCities = regions_cities.filter(region_city => {
      return region_city.region === region
    })
    this.setState({regions_cities: matchedCities})
  }

  filterSubTypeByType(type) {
    const matchedSubtypes = types_subTypes.filter(type_subType => {
      return type_subType.type === type
    })
    this.setState({types_subTypes: matchedSubtypes})
  }

  render() {
    
    const { resetBtns } = this.state

    return ( 
      <div className='Filter d-flex justify-content-around my-4 mx-2'>
        <div className='position-relative'>
          <ResetBtn open={resetBtns.region} handleClick={this.resetValue} />
          <Input 
            name='region' 
            type='text' 
            tabIndex='-1'
            autoComplete="off"
            placeholder={this.props.common.region}
            onMouseOver={this.mouseOver} 
            onFocus={e => this.focus(e.target)}
            onInput={e => this.handleInput(e.target)}
          />
          {this.state.openList.region ? (
            <ListGroup className='select'>
              <Lies 
                names={this.state.regions}
                onClick={this.clickOnRegion}
                sumOf={this.props.sumOf.region}
                content={this.props.content.regions}
              />
            </ListGroup>
          ) : (null)}             
        </div>
        <div className='position-relative'>
          <ResetBtn open={resetBtns.city} handleClick={this.resetValue} />
          <Input 
            name='city' 
            type='text' 
            tabIndex='-1'
            autoComplete="off"
            placeholder={this.props.common.city}
            onMouseOver={this.mouseOver} 
            onFocus={e => this.focus(e.target)}
            onInput={e => this.handleInput(e.target)}
          />
          {this.state.openList.city ? (
            <ListGroup className='select'>
              {resetBtns.region ? (
                <FilteredLiesWithParent 
                  names={this.state.regions_cities}
                  onClick={this.clickOnCity}
                  sumOf={this.props.filteredSumOfByRegion.city}
                  content={this.props.content.cities}
                  listName='city'
                />
              ) : (
                <LiesWithParent 
                  names={this.state.regions_cities}
                  onClick={this.clickOnCity}
                  sumOf={this.props.sumOf.city}
                  content={this.props.content.cities}
                  listName='city'
                />
              )}
            </ListGroup>
          ) : (null)}             
        </div>
        <div className='position-relative'>
          <ResetBtn open={resetBtns.type} handleClick={this.resetValue}/>
          <Input 
            name='type' 
            type='text' 
            tabIndex='-1'
            autoComplete="off"
            placeholder={this.props.common.type}
            onMouseOver={this.mouseOver} 
            onFocus={e => this.focus(e.target)}
            onInput={e => this.handleInput(e.target)}
          />
          {this.state.openList.type ? (
            <ListGroup className='select'>
              {resetBtns.region || resetBtns.city ? (
                  <FilteredLies 
                    names={this.state.types}
                    onClick={this.clickOnType}
                    content={this.props.content.types}
                    sumOf={
                      resetBtns.city ? 
                        this.props.filteredSumOfByCity.type : this.props.filteredSumOfByRegion.type 
                    }
                  />
                ) : (
                  <Lies
                    names={this.state.types}
                    onClick={this.clickOnType}
                    sumOf={this.props.sumOf.type}
                    content={this.props.content.types}
                  />
              )}
            </ListGroup>
          ) : (null)}             
        </div>
        <div className='position-relative'>
          <ResetBtn open={resetBtns.subType} handleClick={this.resetValue} />
          <Input 
            name='subType' 
            type='text' 
            tabIndex='-1'
            autoComplete="off"
            placeholder={this.props.common.subType}
            onMouseOver={this.mouseOver} 
            onFocus={e => this.focus(e.target)}
            onInput={e => this.handleInput(e.target)}
          />
          {this.state.openList.subType ? (
            <ListGroup className='select'>
              {resetBtns.region || resetBtns.city || resetBtns.type ? (
                <FilteredLiesWithParent 
                  names={this.state.types_subTypes}
                  onClick={this.clickOnSubType}
                  content={this.props.content.subTypes}
                  listName='subType'
                  sumOf={
                    resetBtns.type ?
                      this.props.filteredSumOfByType.subType : resetBtns.city ? 
                        this.props.filteredSumOfByCity.subType : this.props.filteredSumOfByRegion.subType
                  }
                />
              ) : (
                <LiesWithParent 
                  names={this.state.types_subTypes}
                  onClick={this.clickOnSubType}
                  sumOf={this.props.sumOf.subType}
                  content={this.props.content.subTypes}
                  listName='subType'
                />
              )}
            </ListGroup>
          ) : (null)}             
        </div>
      </div>
    )
  }
}

const Badges = ({sumOfType}) => {
  return (
    <span onClick={e => e.stopPropagation()}>
      <Badge color="success">{sumOfType.proposal}</Badge>
      <Badge color="danger">{sumOfType.demand}</Badge>
    </span>
  )
}

const ResetBtn = (props) => {
  return props.open ? (
    <span 
      className='close'
      onClick={props.handleClick}
      >
      &times;
    </span>
  ) : null
}

const Lies = (props) => {
  return props.names.map(name => 
    <li 
      key={name + 'l'} 
      className="d-flex justify-content-between list-group-item"
      data-en={name}
      onClick={props.onClick}>
      {props.content[name]}
      <Badges sumOfType={props.sumOf[name]} />
    </li>
  )
}

const LiesWithParent = (props) => {
  return props.names.map(name => {
    const n = props.listName;
    return (
      <li 
        key={name[n] + 'lwp'} 
        className="d-flex justify-content-between list-group-item"
        data-en={name[n]}
        onClick={props.onClick}>
        {props.content[name[n]]}
        <Badges sumOfType={props.sumOf[name[n]]} />
      </li>
    )
  })
}

const FilteredLies = (props) => {
  return props.names.map(name => {
    const sumOfProposal = props.sumOf.proposals[name];
    const sumOfDemand = props.sumOf.demands[name];
    return sumOfProposal || sumOfDemand ? 
      (
        <li 
          key={name + 'fl'} 
          className="d-flex justify-content-between list-group-item"
          data-en={name}
          onClick={props.onClick}>
          {props.content[name]}
          <Badges sumOfType={{ 
              proposal: sumOfProposal || 0,
              demand: sumOfDemand || 0  }} 
          />
        </li>
      ) : null
  })
}

const FilteredLiesWithParent = (props) => {
  return props.names.map(name => {
    const n = props.listName;
    const sumOfProposal = props.sumOf.proposals[name[n]];
    const sumOfDemand = props.sumOf.demands[name[n]];
    return sumOfProposal || sumOfDemand ?
      (
        <li 
          key={name[n] + 'flwp'} 
          className="d-flex justify-content-between list-group-item"
          data-en={name[n]}
          onClick={props.onClick}>
          {props.content[name[n]]}
          <Badges sumOfType={{ 
              proposal: sumOfProposal || 0,
              demand: sumOfDemand || 0  }} 
          />
        </li>
      ) : null
  })
}

const mapStateToProps = (state) => {
  return {
    content: state.content.Filter,
    common: state.content.common,
    sumOf: state.sumOf,
    filteredSumOfByRegion: state.filteredSumOfByRegion,
    filteredSumOfByCity: state.filteredSumOfByCity,
    filteredSumOfByType: state.filteredSumOfByType,
    p: state.proposals.descriptions,
    d: state.demands.descriptions
  }
}

export default connect(mapStateToProps, {
  addFilter, 
  deleteFilter,
  getStatementsAction,
  regionFiltersSumOfAction,
  cityFiltersSumOfAction,
  typeFiltersSumOfAction
})(Filter);