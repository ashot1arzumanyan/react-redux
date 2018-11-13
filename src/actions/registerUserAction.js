import * as types from './constant-types'

const registerUser = userInfo => {
    return dispatch => {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userInfo)})
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.ok) {
                    return dispatch(registerSucces(data.user));
                }
                throw new Error(data.errors || 'Something wrong')
            })
            .catch(err => {
                console.error(err);
                dispatch(registerFail(err));
            })
    }
}

const registerSucces = data => {
    return {
        type: types.REGISTER_SUCCESS,
        payload: data
    }
}

const registerFail = err => {
    return {
        type: types.REGISTER_FAIL,
        err
    }
}

export default registerUser;