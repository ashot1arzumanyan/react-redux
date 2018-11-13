import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import Login from './Login'
import Register from './Register'
import SwitchLangs from './switchLangs/SwitchLangs'
import Home from './Home'
import AddNewProposal from './AddNewProposal'
import EditProposal from './EditProposal';
import AddNewDemand from './AddNewDemand'
import EditDemand from './EditDemand'
import VerifyEmail from './VerifyEmail'
import ResetPasswordSendEmail from './ResetPasswordSendEmail'
import MyStatements from './MyStatements'

import Protected from './Protected'
import logoutAction from '../actions/logoutAction'

const history = createBrowserHistory(); 

class Navigation extends Component {

  constructor(props) {
    super(props) 
    
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    const body = document.querySelector('body');
    body.className = 'light'
  }

  toggleMode(e) {
    const body = document.querySelector('body');
    body.className = e.target.innerText.toLowerCase();
  }

  logout() {
    this.props.logoutAction(() => {
      history.push('/');
    });
  }
 
  render() {

    const { content, user: { username } } = this.props

    return (
      <Router history={history}>
        <div>
          <ul className="nav justify-content-between">
            <li className="nav-item">
              <Link 
                className='nav-link'
                to="/">
                home
              </Link>
            </li>
            <li>
              <ul className='d-flex justify-content-between'>
                <li className="nav-item">
                  <Link 
                    className='nav-link green'  
                    to="/addNewProposal">
                    {content.addNewProposal}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className='nav-link red'
                    to="/addNewDemand">
                    {content.addNewDemand}
                  </Link>
                </li>
              </ul>
            </li>
            {!this.props.user.isLoggedIn ? (
              <li>
                <ul className='d-flex justify-content-between'>
                  <li className="nav-item">
                    <Link 
                      className='nav-link'
                      to="/login">
                      {content.login}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className='nav-link'
                      to="/register">
                      {content.register}
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {username}
                </DropdownToggle>
                <DropdownMenu right>
                  <Link
                    className='dropdown-item'
                    to='/myStatements'>
                    My statements
                  </Link>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.logout}>
                    logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}

            <li className='light-dark'>
              <ul className='d-flex justify-content-between'>
                <li className="nav-item">
                  <a 
                    className='nav-link'
                    onClick={this.toggleMode}>
                    Light
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className='nav-link'
                    onClick={this.toggleMode}>
                    Dark
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <SwitchLangs />
            </li>
          </ul>

          <Route exact path='/' component={Home} />
          <Route path='/addNewProposal' component={Protected(AddNewProposal)} />
          <Route path='/editProposal' component={Protected(EditProposal)} />
          <Route path='/addNewDemand' component={Protected(AddNewDemand)} />
          <Route path='/editDemand' component={Protected(EditDemand)} />          
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/verifyEmail' component={VerifyEmail} />
          <Route path='/resetPasswordSendEmail' component={ResetPasswordSendEmail} />
          <Route path='/myStatements' component={Protected(MyStatements)} />

        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.content.Navigation,
    user: state.user,
    logoutAction: state.logoutAction,
  }
}

const connectNavigation = connect(mapStateToProps, {logoutAction})(Navigation); 

export default connectNavigation