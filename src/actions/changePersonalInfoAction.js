import * as types from './constant-types'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const changePersonalInfoAction = data => {
    return dispatch => {
        dispatch(changePersonalInfoStartFetching)
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/changePersonalInfo', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)})
            .then(handleResponse)
            .then((json) => {
                dispatch(changePersonalInfoSuccess(json.user));
                localStorage.setItem('access_token', json.access_token)
            })
            .catch(res => {
                dispatch(changePersonalInfoFail);
                handleError(res, dispatch)
            })
    }
}

const changePersonalInfoStartFetching = {
    type: types.CHANGE_PERSONAL_INFO_START_FETCHING
}

const changePersonalInfoSuccess = (user) => {
    return {
        type: types.CHANGE_PERSONAL_INFO_SUCCESS,
        payload: user
    }
}

const changePersonalInfoFail = {
    type: types.CHANGE_PERSONAL_INFO_FAIL,
}

export default changePersonalInfoAction;