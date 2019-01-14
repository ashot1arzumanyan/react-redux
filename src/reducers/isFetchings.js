import * as types from '../actions/constant-types'

const initialState = {
  isFetching: false
}

const isFetchings = (state = initialState, action) => {
  switch (action.type) {
    case types.RESET_PASSWORD_SEND_EMAIL_START_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case types.RESET_PASSWORD_SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case types.RESET_PASSWORD_SEND_EMAIL_FAIL:
      return {
        ...state,
        isFetching: false
      }

    case types.RESET_PASSWORD_START_FETCHING:
      return {
        ...state,
        isFetching: true
      }
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        isFetching: false
      }
  
    default:
      return state
  }
}

export default isFetchings