import * as types from './constant-types'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const registerUser = userInfo => {
    userInfo.lang = localStorage.getItem('lang');
    return dispatch => {
        dispatch(registerStartFetching)
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userInfo)})
            .then(handleResponse)
            .then((data) => {
                return dispatch(registerSucces(data.user));
            })
            .catch(res => {
                dispatch(registerFail);
                handleError(res, dispatch);
            })
    }
}

const registerStartFetching = {
    type: types.REGISTER_START_FETCHING
}

const registerSucces = data => {
    return {
        type: types.REGISTER_SUCCESS,
        payload: data
    }
}

const registerFail = {
    type: types.REGISTER_FAIL
}

export default registerUser;