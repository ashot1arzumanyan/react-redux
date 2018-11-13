import * as types from './constant-types'

const checkToken = () => {
    return dispatch => {
        dispatch(checkTokenStartFetching());
        const token = localStorage.getItem('access_token');
        if (token) {
            fetch('/checkToken', {
                method: 'POST',
                headers: { 'Authorization' :`Bearer ${token}` }
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.ok) {
                    return dispatch(checkTokenSuccess(data.user));
                } else {
                    localStorage.removeItem('access_token');
                    dispatch(checkTokenFail())
                }
            })
            .catch(err => {
                localStorage.removeItem('access_token');
                dispatch(checkTokenFail())
                console.error(err);
            });
        } else {
            dispatch(checkTokenFail())
        }
    }
}

const checkTokenStartFetching = () => {
    return {
        type: types.CHECK_TOKEN_START_FETCHING,
    }
}

const checkTokenSuccess = (user) => {
    return {
        type: types.CHECK_TOKEN_SUCCESS,
        payload: user
    }
}

const checkTokenFail = () => {
    return {
        type: types.CHECK_TOKEN_FAIL
    }
}

export default checkToken;