import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, ListGroup, ListGroupItem, Badge, FormFeedback } from 'reactstrap'

import regions from '../constants/regions'
import regions_cities from '../constants/regions_cities'
import types from '../constants/types'
import types_subTypes from '../constants/types_subTypes'

import getSumOfAction from '../actions/getSumOfAction'
import { addFilter, deleteFilter } from '../actions/filterByAction'
import getDemandsAction from '../actions/getDemandsAction'
import getProposalsAction from '../actions/getProposalsAction'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.regions = []
    this.regions_cities = []
    this.types = []
    this.types_subTypes = []
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
      }
    }

    this.focus = this.focus.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getSumOfAction()        
    }, 0);
    this.regions = regions
    this.regions_cities = regions_cities
    this.types = types
    this.types_subTypes = types_subTypes
    this.setState({
      regions: this.regions,
      regions_cities: this.regions_cities,
      types: this.types,
      types_subTypes: this.types_subTypes,
    })
  }

  mouseOver(target) {
    target.focus();
    const hideEl = (ev) => {                                                                                                                                     
      const target = ev.target;
      const input = target.querySelector('input'); 
      const ul = target.querySelector('ul');                                                                                                                  
      input.blur();                                                                                                                         
      ul.style.display = 'none';
      target.removeEventListener('mouseleave', hideEl); 
    }                                                                                                                                                            
    target.parentElement.addEventListener('mouseleave', hideEl);
  }

  focus(target) {                                                                                                                                            
    target.parentElement.querySelector('ul').style.display = 'block'; 
  }

  keyUp(target) {
    const value = target.value.toLowerCase();
    const name = target.name;
    if (value) {
      this.setState({ resetBtns: {[name]: true} })
    } else {
      this.setState({ resetBtns: {[name]: false} })
      this.props.deleteFilter(name);
    }

    if (name === 'region') {
      return this.filterRegionOrType(value, 'regions')
    } else if (name === 'city') {
      return this.filterCity(value)
    } else if (name === 'type') {
      return this.filterRegionOrType(value, 'types')
    } else if (name === 'subType') {
      return this.filterSubType(value)
    }
  }

  clickOnRegion(target) {
    this.setInputValue(target);
    const regionEn = target.dataset.en;
    this.filterCityByRegion(regionEn);
  }

  clickOnCity(target) {
    this.setInputValue(target);
    const regionEn = target.dataset.region;
    const regionInput = document.querySelector('input[name="region"]');
    regionInput.value = this.props.content.regions[regionEn];
    regionInput.dataset.en = regionEn;
    // const evn = new Event('input', { bubbles: true });
    // regionInput.dispatchEvent(evn);
  }

  clickOnType(target) {
    this.setInputValue(target);
    const typeEn = target.dataset.en;
    this.filterSubTypeByType(typeEn);
  }

  clickOnSubType(target) {
    this.setInputValue(target);
    const typeEn = target.dataset.type;
    const typeInput = document.querySelector('input[name="type"]');
    typeInput.value = this.props.content.types[typeEn];
    typeInput.dataset.en = typeEn;
    // const evn = new Event('input', { bubbles: true });
    // typeInput.dispatchEvent(evn);
  }

  setInputValue(target) {
    const { 
      skip_demand, 
      count_demand, 
      isFetchingGet_demand, 
      linkToCachedAll_demand, 
      getDemandsAction,
      skip_proposal, 
      count_proposal, 
      isFetchingGet_proposal, 
      linkToCachedAll_proposal, 
      getProposalsAction, 
      addFilter 

    } = this.props
    const value = target.firstChild.data;
    const input = target.parentElement.parentElement.querySelector('input');
    const resetBtns = { ...this.state.resetBtns };
    resetBtns[input.name] = true;
    this.setState({resetBtns: resetBtns})
    const currentEn = target.dataset.en;                                                                                                 
    input.value = value;
    input.dataset.en = currentEn;
    if (skip_demand < count_demand && !isFetchingGet_demand) {
      getDemandsAction(skip_demand, linkToCachedAll_demand)
    }
    if (skip_proposal < count_proposal && !isFetchingGet_proposal) {
      getProposalsAction(skip_proposal, linkToCachedAll_proposal)
    }
    addFilter({[input.name]: currentEn})
    // const evn = new Event('input', { bubbles: true });
    // input.dispatchEvent(evn);
  }

  resetValue(target) {
    const input = target.parentElement.parentElement.querySelector('input');
    input.value = '';
    this.resetFilter(input.name);
  }

  resetFilter(param) {
    this.props.deleteFilter(param);
    const resetBtns = { ...this.state.resetBtns };
    resetBtns[param] = false;
    if (param === 'region') {
      return this.setState({
        regions: this.regions,
        regions_cities: this.regions_cities,
        resetBtns: resetBtns
      })
    } else if (param === 'city') {
      return this.setState({
        regions_cities: this.regions_cities,
        resetBtns: resetBtns
      })
    } else if (param === 'type') {
      return this.setState({
        types: this.types,
        types_subTypes: this.types_subTypes,
        resetBtns: resetBtns
      })
    } else if (param === 'subType') {
      return this.setState({
        types_subTypes: this.types_subTypes,
        resetBtns: resetBtns
      })
    }
  }

  filterRegionOrType(value, regionOrType) {
    const content = this.props.content[regionOrType];
    const matched = this[regionOrType].filter(o => {
      return o.includes(value) || content[o].toLowerCase().includes(value)
    })
    this.setState({
      [regionOrType]: matched
    })
  }

  filterCity(value) {
    const cities = this.props.content.cities;
    const matchedCities = this.regions_cities.filter(region_city => {
      return region_city.city.includes(value) || cities[region_city.city].toLowerCase().includes(value)
    })
    this.setState({regions_cities: matchedCities})
  }

  filterSubType(value) {
    const subTypes = this.props.content.subTypes;
    const matchedSubTypes = this.types_subTypes.filter(type_subType => {
      return type_subType.subType.includes(value) || subTypes[type_subType.subType].toLowerCase().includes(value)
    })
    this.setState({types_subTypes: matchedSubTypes})
  }

  filterCityByRegion(region) {
    const matchedCities = this.regions_cities.filter(region_city => {
      return region_city.region === region
    })
    this.setState({regions_cities: matchedCities})
  }

  filterSubTypeByType(type) {
    const matchedSubtypes = this.types_subTypes.filter(type_subType => {
      return type_subType.type === type
    })
    this.setState({types_subTypes: matchedSubtypes})
  }

  render() {
    
    const { content, common, sumOf } = this.props
        
    const Badges = ({sumOfType, referer }) => {
      return (
        <span>
          <Badge color="success">{sumOfType[referer].proposal}</Badge>
          <Badge color="danger">{sumOfType[referer].demand}</Badge>
        </span>
      )
    }

    const CleareBtn = () => {
      return (
        <button 
          type="button" 
          className='close' 
          aria-label="Close" 
          onClick={e => this.resetValue(e.target)}
          >
          <span aria-hidden="true">&times;</span>
        </button>
      )
    }

    return ( 
      <div className='Filter my-4 mx-2'>
        <div className='d-flex justify-content-around'>
          <div className='position-relative'>
            {this.state.resetBtns.region ? <CleareBtn /> : null}
            <Input 
              name='region' 
              type='text' 
              placeholder={common.region}
              onMouseOver={e => this.mouseOver(e.target)} 
              onFocus={e => this.focus(e.target)}
              onKeyUp={e => this.keyUp(e.target)}
            />             
            <ListGroup style={{display: 'none'}} className='select'>
              {this.state.regions.map(region => 
                <ListGroupItem 
                  key={region} 
                  className="d-flex justify-content-between"
                  data-en={region}
                  onClick={e => this.clickOnRegion(e.target)}>
                  {content.regions[region]}
                  <Badges sumOfType={sumOf.region} referer={region} />
                </ListGroupItem>
              )}
            </ListGroup>
          </div>
          <div className='position-relative'>
            {this.state.resetBtns.city ? <CleareBtn /> : null}
            <Input 
              name='city' 
              type='text' 
              placeholder={common.city}
              onMouseOver={e => this.mouseOver(e.target)} 
              onFocus={e => this.focus(e.target)}
              onKeyUp={e => this.keyUp(e.target)}
            />
            <ListGroup style={{display: 'none'}} className='select'>
              {this.state.regions_cities.map(region_city => 
                <ListGroupItem
                  key={region_city.city}
                  className="d-flex justify-content-between"
                  data-en={region_city.city}
                  data-region={region_city.region}
                  onClick={e => this.clickOnCity(e.target)}>
                  {content.cities[region_city.city]}
                  <Badges sumOfType={sumOf.city} referer={region_city.city} />
                </ListGroupItem>  
              )}
            </ListGroup>
          </div>
          <div className='position-relative'>
            {this.state.resetBtns.type ? <CleareBtn /> : null}
            <Input 
              name='type' 
              type='text' 
              placeholder={common.type}
              onMouseOver={e => this.mouseOver(e.target)} 
              onFocus={e => this.focus(e.target)}
              onKeyUp={e => this.keyUp(e.target)}
            />
            <ListGroup style={{display: 'none'}} className='select'>
              {this.state.types.map(type => 
                <ListGroupItem 
                  key={type} 
                  className="d-flex justify-content-between"
                  data-en={type}
                  onClick={e => this.clickOnType(e.target)}>
                  {content.types[type]}
                  <Badges sumOfType={sumOf.type} referer={type} />
                </ListGroupItem>
              )}
            </ListGroup>
          </div>
          <div className='position-relative'>
            {this.state.resetBtns.subType ? <CleareBtn /> : null}
            <Input 
              name='subType' 
              type='text' 
              placeholder={common.subType}
              onMouseOver={e => this.mouseOver(e.target)} 
              onFocus={e => this.focus(e.target)}
              onKeyUp={e => this.keyUp(e.target)}
            />
            <ListGroup style={{display: 'none'}} className='select'>
              {this.state.types_subTypes.map(type_subType => 
                <ListGroupItem
                  key={type_subType.subType}
                  className="d-flex justify-content-between"
                  data-en={type_subType.subType}
                  data-type={type_subType.type}
                  onClick={e => this.clickOnSubType(e.target)}>
                  {content.subTypes[type_subType.subType]}
                  <Badges sumOfType={sumOf.subType} referer={type_subType.subType} />
                </ListGroupItem>  
              )}
            </ListGroup>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.content.Filter,
    common: state.content.common,
    sumOf: state.sumOf,
    skip_demand: state.demands.skip,
    count_demand: state.demands.count,
    isFetchingGet_demand: state.demands.isFetchingGet,
    linkToCachedAll_demand: state.demands.linkToCachedAll,
    skip_proposal: state.proposals.skip,
    count_proposal: state.proposals.count,
    isFetchingGet_proposal: state.proposals.isFetchingGet,
    linkToCachedAll_proposal: state.proposals.linkToCachedAll
  }
}

export default connect(mapStateToProps, {
  getSumOfAction, 
  addFilter, 
  deleteFilter,
  getDemandsAction,
  getProposalsAction
})(Filter);