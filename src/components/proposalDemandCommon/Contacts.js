import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class Contacts extends Component {
  
  render () {

    const { common, email, phone, yourName } = this.props

    return (
      <div className='Contacts'>
        <div className='d-flex justify-content-around'>
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <span>{yourName}</span>
            <small className='text-muted'>{common.username}</small>
          </div>
          {email ? (
            <Fragment>
              {/* <VerticalDivider /> */}
              <div className='d-flex flex-column justify-content-between align-items-center'>
                <span>{email}</span>
                <small className='text-muted'>{common.email}</small>
              </div>
            </Fragment>
          ) : ('')}
          {phone ? (
            <Fragment>
              {/* <VerticalDivider /> */}
              <div className='d-flex flex-column justify-content-between align-items-center'>
                <span>{phone}</span>
                <small className='text-muted'>{common.phone}</small>
              </div>
            </Fragment>
          ) : ('')}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return{
    common : state.content.common,
  }
}

export default connect(mapStateToProps)(Contacts)