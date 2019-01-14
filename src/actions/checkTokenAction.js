import * as types from './constant-types'
import { handleResponse } from '../helpers/fetchHandlers'
import { history } from '../components/Navigation'

const checkToken = () => {
    return dispatch => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetch('/checkToken', {
                headers: { 'Authorization' :`Bearer ${token}` }
            })
            .then(handleResponse)
            .then((data) => {
                dispatch(checkTokenSuccess(data.user));
                history.push('/')
            })
            .catch(res => {
                localStorage.removeItem('access_token');
                dispatch(checkTokenFail);
                console.log(res.statusText);
            });
        } else {
            dispatch(checkTokenFail)
        }
    }
}

const checkTokenSuccess = (user) => {
    return {
        type: types.CHECK_TOKEN_SUCCESS,
        payload: user
    }
}

const checkTokenFail = {
    type: types.CHECK_TOKEN_FAIL
}

export default checkToken;