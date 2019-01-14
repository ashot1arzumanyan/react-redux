import * as types from './constant-types'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const loginUser = (userInfo, cb) => {
    return dispatch => {
        dispatch(loginStartFetching)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userInfo)
        })
        .then(handleResponse)
        .then((data) => {
            localStorage.setItem('access_token', data.access_token);
            dispatch(loginSucces(data.user));
            cb();
        })
        .catch(res => {
            dispatch(loginFail);
            handleError(res, dispatch)
        })
    }
}

const loginStartFetching = {
    type: types.LOGIN_START_FETCHING
}

const loginSucces = (res) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: res
    }
}

const loginFail = {
    type: types.LOGIN_FAIL
}

export default loginUser;