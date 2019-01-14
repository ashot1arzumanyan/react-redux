import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteErrors } from '../actions/addDeleteErrorAction'

class WarningAlertFromServer extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.dispatch(deleteErrors)
  }

  render() {

    const errors = this.props.errors

    if (!errors.length) {
      return null
    }

    return (
      <div className='WarningFromServer'>
        <div onClick={this.handleClick}>
          &times;
        </div>
        <ul>
          {errors.map((error, i) => {
            if (typeof error === 'string') {
              return (
                <li key={i}>
                  {this.props.msgs[error]}
                </li>
              )
            } else if (typeof error === 'object' && typeof error.msg === 'string') {
              return (
                <li key={i}>
                  {this.props.msgs[error.msg]}
                </li>
              )
            } else {
              return null
            }
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors.errors,
    msgs: state.content.serverErrMsgs
  }
} 

export default connect(mapStateToProps) (WarningAlertFromServer)