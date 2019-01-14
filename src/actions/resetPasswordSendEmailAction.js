import * as types from './constant-types'
import { handleResponseWithoutData, handleError } from '../helpers/fetchHandlers'

const resetPasswordSendEmail = (data) => {
    data.lang = localStorage.getItem('lang');
    return dispatch => {
        dispatch(sendEmailStartFetching);
        fetch('/resetPasswordSendEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data)
        })
        .then(handleResponseWithoutData)
        .then(() => {
            dispatch(sendEmailSuccess)
        })
        .catch(res => {
            dispatch(sendEmailFail)
            handleError(res, dispatch)
        })
    }
}

const sendEmailStartFetching = {
    type: types.RESET_PASSWORD_SEND_EMAIL_START_FETCHING
}

const sendEmailSuccess = {
    type: types.RESET_PASSWORD_SEND_EMAIL_SUCCESS
}

const sendEmailFail = {
    type: types.RESET_PASSWORD_SEND_EMAIL_FAIL,
}


export default resetPasswordSendEmail;