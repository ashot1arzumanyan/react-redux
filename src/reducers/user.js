import * as types from '../actions/constant-types'

const initialState = {
    isFetching: false,
    isLoggedIn: false,
    email: '',
    username: '',
    _id: '',
    phone: '',
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_START_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
                isFetching: false,
                isFirstLogin: false
            }
        case types.LOGIN_FAIL:
            return {
                ...state,
                ...action.payload,
                isLoggedIn: false,
                isFetching: false,
            }
        case types.CHECK_TOKEN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true,
                isFetching:false
            }
        case types.CHECK_TOKEN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                isFetching: false,
                email: '',
                username: '',
                _id: '',
                phone: ''
            }
        case types.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                email: '',
                username: '',
                _id: ''
            }

        case types.CHANGE_PERSONAL_INFO_START_FETCHING: 
            return {
                ...state,
                isFetching: true
            }
        case types.CHANGE_PERSONAL_INFO_SUCCESS: 
            return {
                ...state,
                ...action.payload,
                isFetching: false
            }
        case types.CHANGE_PERSONAL_INFO_FAIL: 
            return {
                ...state,
                isFetching: false
            }

        case types.UPDATE_PASSWORD_START_FETCHING: 
            return {
                ...state,
                isFetching: true
            }
        case types.UPDATE_PASSWORD_SUCCESS: 
            return {
                ...state,
                isFetching: false
            }
        case types.UPDATE_PASSWORD_FAIL: 
            return {
                ...state,
                isFetching: false
            }
        default:
            return state;
    }
}

export default user;