import * as types from './constant-types'

const logoutAction = (cb) => {
    localStorage.removeItem('access_token');
    return dispatch => {
        dispatch(logout());
        cb();
    }
}

const logout = () => {
    return {
        type: types.LOGOUT
    }
}

export default logoutAction;