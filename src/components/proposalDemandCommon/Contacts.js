import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'

import VerticalDivider from './VerticalDivider'

class Contacts extends Component {

  componentDidMount() {
    const target = ReactDOM.findDOMNode(this) 
    const infoDivParent = target.firstElementChild
    const infoDiv = infoDivParent.firstElementChild
    const span = infoDiv.firstElementChild
    const hr = target.previousElementSibling
    const hrWidth = hr.offsetWidth
    infoDivParent.style.width = hrWidth + 'px'
    infoDiv.style.width = hrWidth / 1.5 + 'px'
    span.left = span.offsetLeft + hrWidth / 2 - span.offsetWidth / 2
    infoDiv.style.fontSize = '10px'
    infoDiv.style.top = '53px'
    hr.style.width = hrWidth / 2 + 'px'
    this.hr = hr
  }

  componentWillUnmount() {
    this.hr.style.width = '100%'
  }
  
  render () {

    const { common, email, phone, yourName } = this.props

    return (
      <div>
        <div className='d-flex justify-content-center'>
          <div 
          className='contact_info position-absolute'>
            <span>Կոնտակտային տվյալներ</span>
          </div>
        </div>
      <div className='Contacts d-flex justify-content-around' style={{height: '57px'}}>
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