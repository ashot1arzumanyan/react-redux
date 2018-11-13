import * as types from './constant-types'

const resetPasswordSendEmail = (email) => {
    return dispatch => {
        fetch('/resetPasswordSendEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(email)
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.ok) {
                dispatch(sendEmailSuccess())
            }
            throw new Error(data.errors || 'something wrong')
        }).catch(err => {
            console.error(err);
            dispatch(sendEmailFail(err))
        })
    }
}

const startSendEmail = () => {
    return dispatch => {
        dispatch(sendEmailStartFetching())
    }
}

const sendEmailStartFetching = () => {
    return {
        type: types.RESET_PASSWORD_SEND_EMAIL_START_FETCHING
    }
}

const sendEmailSuccess = () => {
    return {
        type: types.RESET_PASSWORD_SEND_EMAIL_SUCCESS
    }
}

const sendEmailFail = (err) => {
    return {
        type: types.RESET_PASSWORD_SEND_EMAIL_FAIL,
        payload: err
    }
}

export { startSendEmail, resetPasswordSendEmail }