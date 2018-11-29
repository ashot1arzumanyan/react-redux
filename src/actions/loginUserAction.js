import * as types from './constant-types'

const loginUser = (userInfo, cb) => {
    return dispatch => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userInfo)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.ok) {
                localStorage.setItem('access_token', data.access_token);
                dispatch(loginSucces(data.user));
                cb();
                return
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(loginFail(err));
        });
    }
}

const loginSucces = (res) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: res
    }
}

const loginFail = (err) => {
    return {
        type: types.LOGIN_FAIL,
        payload: err
    }
}

export default loginUser;