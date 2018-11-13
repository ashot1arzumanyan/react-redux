import * as types from './constant-types'

const setUserEmailAction = (email, cb) => {
    return dispatch => {
        dispatch(setUserEmail(email));
        cb();
    }
}

const setUserEmail = (email) => {
    return {
        type: types.SET_USER_EMAIL,
        payload: email
    }
}

export default setUserEmailAction