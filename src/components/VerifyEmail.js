import React, { Component } from 'react'
import { connect } from 'react-redux'

import setUserEmailAction from '../actions/setUserEmailAction'

class VerifyEmail extends Component {

  componentDidMount() {
    const { location } = this.props; 
    const searchParams = location.search;
    const url = location.pathname + (searchParams !== 'undefined' ? searchParams : '');
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.ok) {
          this.props.setUserEmailAction(data.user.email, () => {
            this.props.history.push('/login');
          })
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <div>VerifyEmail</div>
    )
  }
}

export default connect(null, { setUserEmailAction })(VerifyEmail)