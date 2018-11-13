import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Protected = (Component) => { 

  class Auth extends React.Component {

    render() {

      const { isFetching, isLoggedIn } = this.props.user

      if (isFetching) {
        return <div>Loading...</div>
      }

      return (
        isLoggedIn ? (
          <Component {...this.props} />
        ) : (
          <Redirect to='login' />
        )
      )
    }
  }
   
  const mapStateToProps = (state) => {
    return {
      user: state.user,
    }  
  }
  return connect(mapStateToProps)(Auth)                                                                                                        
}

export default Protected