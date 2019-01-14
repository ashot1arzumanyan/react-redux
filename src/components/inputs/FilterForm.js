import React, { Component } from 'react'

import regions from '../../constants/regions'
import regions_cities from '../../constants/regions_cities'
import types from '../../constants/types'
import types_subTypes from '../../constants/types_subTypes'
import DropdownInputLabelWithChildList from './DropdownInputLabelWithChildList'

class FilterForm extends Component {

  render() {

    const { onFocus, onClick, onBlur, onInput, setNameValue, isBlurred, isInvalidMsg } = this.props
    
    return (
      <div className='FilterForm Filter my-4 d-flex justify-content-around'>
        <DropdownInputLabelWithChildList 
          name='region'
          type='text'
          onFocus={onFocus}
          onClick={onClick}
          onBlur={onBlur}
          onInput={onInput}
          setNameValue={setNameValue}
          list={regions}
          listName='regions'
          isBlurred={isBlurred}
          isInvalidMsg={isInvalidMsg}
          childName='city'
          childList={regions_cities}
          childListName='cities'
        />       
        <DropdownInputLabelWithChildList 
          name='type'
          type='text'
          onFocus={onFocus}
          onClick={onClick}
          onBlur={onBlur}
          onInput={onInput}
          setNameValue={setNameValue}
          list={types}
          listName='types'
          isBlurred={isBlurred}
          isInvalidMsg={isInvalidMsg}
          childName='subType'
          childList={types_subTypes}
          childListName='subTypes'
        />
      </div>
    )
  }
}

export default FilterForm