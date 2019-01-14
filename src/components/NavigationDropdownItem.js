import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class NavigationDropdownItem extends Component {

  constructor(props) {
    super(props) 
    
    this.state = {
      isDropdownOpen: false
    }

    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown() {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen })
  }

  render() {

    const { username, my_statements, settings, logout, handleLogout } = this.props

    return (
      <Dropdown nav inNavbar isOpen={this.state.isDropdownOpen} toggle={this.toggleDropdown}>
      <DropdownToggle nav caret>
        {username}
      </DropdownToggle>
      <DropdownMenu right>
        <Link
          className='dropdown-item'
          to='/myStatements'
          onClick={this.toggleDropdown}>
          {my_statements}
        </Link>
        <Link
          className='dropdown-item'
          to='/settings/personalInfo'
          onClick={this.toggleDropdown}>
          {settings}
        </Link>
        <DropdownItem divider />
        <span 
          className='dropdown-item cursor-pointer'
          onClick={handleLogout}>
          {logout}
        </span>
      </DropdownMenu>
    </Dropdown>
    )
  }
}

export default NavigationDropdownItem