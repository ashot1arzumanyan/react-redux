import * as types from './constant-types'

const resetPassword = (data, cb) => {
    return dispatch => {
        dispatch(resetPasswordStartFetching())
        fetch('/resetPassword', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data)
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.ok) {
                localStorage.setItem('access_token', data.access_token);
                dispatch(resetPasswordSuccess(data.user));
                cb();
                return;
            }
            throw new Error(data.errors || 'something wrong')
        }).catch(err => {
            console.error(err);
            dispatch(resetPasswordFail(err))
        })
    }
}

const resetPasswordStartFetching = () => {
    return {
        type: types.RESET_PASSWORD_SEND_EMAIL_START_FETCHING
    }
}

const resetPasswordSuccess = (res) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: res
    }
}

const resetPasswordFail = (err) => {
    return {
        type: types.RESET_PASSWORD_SEND_EMAIL_FAIL,
        payload: err
    }
}

export default resetPassword