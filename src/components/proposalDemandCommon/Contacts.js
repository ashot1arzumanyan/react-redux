import React, { PureComponent, Fragment } from 'react'

class Contacts extends PureComponent {
  
  render () {

    const { common, email, phone, username } = this.props

    return (
      <div className='Contacts'>
        <div className='d-flex justify-content-around'>
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <span>{username}</span>
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

export default Contacts