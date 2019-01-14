import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Protected = (Component) => { 

  class Auth extends React.Component {

    render() {

      return (
        this.props.isLoggedIn ? (
          <Component {...this.props} />
        ) : (
          <Redirect to='login' />
        )
      )
    }
  }
   
  const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.user.isLoggedIn,
    }  
  }
  return connect(mapStateToProps)(Auth)                                                                                                        
}

export default Protected