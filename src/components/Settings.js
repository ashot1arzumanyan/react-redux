import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import UpdatePersonalInfo from './UpdatePersonalInfo'
import UpdatePassword from './UpdatePassword'

class Settings extends Component {

  render() {

    const content = this.props.content

    return (
      <div className='Settings d-flex'>
          <ul>
            <li
              onClick={() => this.props.history.push('/settings/personalInfo')}>
              {content.change_personal_info}
            </li>
            <li
              onClick={() => this.props.history.push('/settings/updatePassword')}>
              {content.change_password}
            </li>
            {/* <li>{content.remove_account}</li> */}
          </ul>
        <div className='d-flex justify-content-center w-100'>
          <Route path='/settings/personalInfo' component={UpdatePersonalInfo}/>
          <Route path='/settings/updatePassword' component={UpdatePassword} />
        </div>
      </div>
    )
  }
}

const mapstateToProps = (state) => {
  return {
    content: state.content.Settings,
  }
}

export default connect(mapstateToProps)(Settings)