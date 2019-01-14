import React, { PureComponent } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createBrowserHistory } from 'history'

import Login from './Login'
import Register from './Register'
import SwitchLangs from './switchLangs/SwitchLangs'
import Home from './Home'
import AddNewProposal from './AddNewProposal'
import EditProposal from './EditProposal';
import AddNewDemand from './AddNewDemand'
import EditDemand from './EditDemand'
import VerifyEmail from './VerifyEmail'
import SendVerificationCode from './SendVerificationCode'
import ResetPassword from './ResetPassword'
import MyStatements from './MyStatements'
import Settings from './Settings'
import NavigationDropdownItem from './NavigationDropdownItem'
import WarningAlertFromServer from './WarningAlertFromServer'
import Logo from './logo'

import Protected from './Protected'
import logoutAction from '../actions/logoutAction'

export const history = createBrowserHistory(); 

class Navigation extends PureComponent {

  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    const mode = localStorage.getItem('mode');
    document.querySelector('body').className = mode ? mode : 'light';
  }

  logout() {
    this.props.logoutAction(() => {
      history.push('/');
    });
  }

  toggleMode(e) {
    const mode = e.target.innerText.toLowerCase();
    document.querySelector('body').className = mode;
    localStorage.setItem('mode', mode)
  }

  render() {

    const { content, user: { username } } = this.props

    return (
      <Router history={history}>
        <React.Fragment>
          <nav>
            <ul className="Navigation d-flex justify-content-between position-relative">
              <li className="nav-item">
                <Link 
                  className='nav-link'
                  to="/">
                  <Logo />
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
                <NavigationDropdownItem 
                  handleLogout={this.logout}
                  history={history}
                  username={username}
                  my_statements={content.my_statements}
                  settings={content.settings}
                  logout={content.logout}
                />
              )}

              <li className='light-dark'>
                <ul className='d-flex justify-content-between'>
                  <li className="nav-item">
                    <span 
                      className='nav-link cursor-pointer'
                      onClick={this.toggleMode}>
                      Light
                    </span>
                  </li>
                  <li className="nav-item">
                    <span 
                      className='nav-link cursor-pointer'
                      onClick={this.toggleMode}>
                      Dark
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <SwitchLangs />
              </li>
            </ul>
          </nav>

          <Route exact path='/' component={Home} />
          <Route path='/addNewProposal' component={Protected(AddNewProposal)} />
          <Route path='/editProposal' component={Protected(EditProposal)} />
          <Route path='/addNewDemand' component={Protected(AddNewDemand)} />
          <Route path='/editDemand' component={Protected(EditDemand)} />          
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/verifyEmail' component={VerifyEmail} />
          <Route path='/sendVerificationCode' component={SendVerificationCode} />
          <Route path='/resetPassword' component={ResetPassword} />          
          <Route path='/myStatements' component={Protected(MyStatements)} />
          <Route path='/settings' component={Protected(Settings)} />

          <WarningAlertFromServer />

        </React.Fragment>
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