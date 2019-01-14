import * as types from './constant-types'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const resetPassword = (data, cb) => {
    return dispatch => {
        dispatch(resetPasswordStartFetching);
        fetch('/resetPassword', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data)
        })
        .then(handleResponse)
        .then(data => {
            localStorage.setItem('access_token', data.access_token);
            dispatch(login(data.user));
            dispatch(resetPasswordSuccess)
            cb();
        })
        .catch(res => {
            dispatch(resetPasswordFail);
            handleError(res, dispatch)
        })
    }
}

const resetPasswordStartFetching = {
    type: types.RESET_PASSWORD_START_FETCHING
}

const login = (res) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: res
    }
}

const resetPasswordSuccess = {
    type: types.RESET_PASSWORD_SUCCESS
}

const resetPasswordFail = {
    type: types.RESET_PASSWORD_FAIL,
}

export default resetPassword