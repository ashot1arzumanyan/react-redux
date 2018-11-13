import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavItem, NavLink } from 'reactstrap'

import getContentByLang from '../../actions/getContentByLang'

class switchLangs extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { getContentByLang } = this.props
    return ( 
      <ul className='d-flex'>
        <NavItem>
          <NavLink
            className='px-1'
            href="#"
            onClick={() => getContentByLang('hy')}>
            <img src={require('./images/hy_AM.png')} height='15px' width='23px' alt='arm'></img>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink 
            className='px-1'
            href="#"
            onClick={() => getContentByLang('ru')}>
            <img src={require('./images/ru_RU.png')} height='15px' width='23px' alt='ru'></img>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className='px-1'
            href="#"
            onClick={() => getContentByLang('en')}>
            <img src={require('./images/en_US.png')} height='15px' width='23px' alt='en'></img>
          </NavLink>
        </NavItem>
      </ul>
    )
  }
}

const connectRegister = connect(null, { getContentByLang })(switchLangs)

export default connectRegister