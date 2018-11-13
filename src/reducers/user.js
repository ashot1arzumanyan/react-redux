import * as types from '../actions/constant-types'

const initialState = {
    isFetching: false,
    isLoggedIn: false,
    isFirstLogin: false,
    email: '',
    username: '',
    errors: []
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                errors: [],
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
        case types.CHECK_TOKEN_START_FETCHING:
            return {
                ...state,
                isFetching: true
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
                _id: ''
            }
        case types.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                email: '',
                username: ''
            }
        case types.SET_USER_EMAIL:
            return {
                ...state,
                isFirstLogin: true,
                email: action.payload
            }
        default:
            return state;
    }
}

export default user;