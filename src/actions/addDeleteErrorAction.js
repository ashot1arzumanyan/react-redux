import * as types from './constant-types'

export const addErrors = (errors) => {
  return {
    type: types.ADD_ERRORS,
    payload: errors
  }
}

export const deleteErrors = {
  type: types.DELETE_ERRORS,
} 