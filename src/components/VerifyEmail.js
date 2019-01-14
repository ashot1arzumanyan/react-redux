import React, { Component } from 'react'
import { connect } from 'react-redux'

import verifyEmailAction from '../actions/verifyEmailAction'
import LoadingButtonSpiner from './LoadingButtonSpiner'

class VerifyEmail extends Component {

  componentDidMount() {
    const { location, history } = this.props; 
    const searchParams = location.search;
    const url = location.pathname + (searchParams !== 'undefined' ? searchParams : '');
    this.props.verifyEmailAction(url, () => {
      history.push('/')
    })
  }

  render() {
    return (
      <div className='position-relative'>
        <LoadingButtonSpiner />
      </div>
    )
  }
}

export default connect(null, { verifyEmailAction })(VerifyEmail)