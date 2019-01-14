import * as types from './constant-types'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const verifyEmailAction = (url, cb) => {
  return dispatch => {
    fetch(url)
      .then(handleResponse)
      .then(data => {
        localStorage.setItem('access_token', data.access_token);
        dispatch(loginSucces(data.user));
        cb();
      })
      .catch(res => {
        cb();
        handleError(res, dispatch);
      })
  }
} 

const loginSucces = (res) => {
  return {
      type: types.LOGIN_SUCCESS,
      payload: res
  }
}

export default verifyEmailAction