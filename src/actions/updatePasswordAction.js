import * as types from './constant-types'
import { handleResponseWithoutData, handleError } from '../helpers/fetchHandlers'

const updatePasswordAction = data => {
    return dispatch => {
        dispatch(updatePasswordStartFetching)
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/updatePassword', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)})
            .then(handleResponseWithoutData)
            .then(() => {
                dispatch(updatePasswordSuccess);
            })
            .catch(res => {
                dispatch(updatePasswordFail);
                handleError(res, dispatch)
            })
    }
}

const updatePasswordStartFetching = {
    type: types.UPDATE_PASSWORD_START_FETCHING
}

const updatePasswordSuccess = {
    type: types.UPDATE_PASSWORD_SUCCESS,
}

const updatePasswordFail = {
    type: types.UPDATE_PASSWORD_FAIL,
}

export default updatePasswordAction;