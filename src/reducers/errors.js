import * as types from '../actions/constant-types';

const initalState = {
  // errors: [ 'hjgkuygku ygkyugkuy gkuygkyugkyu', 'jgkuyg ytg yuuh uyh kuyg kuy gk' ]
  errors: []
}

const errors = (state = initalState, action) => {
  switch(action.type) {
    case types.ADD_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case types.DELETE_ERRORS: 
      return {
        ...state,
        errors: []
      }
    default:
      return state
  }
}

export default errors