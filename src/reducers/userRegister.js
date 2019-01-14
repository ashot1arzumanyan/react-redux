import * as types from '../actions/constant-types';

const initialState = {
    isFetching: false,
    confirmationMsgSent: false,
    email: '',
    username: '',
}

const userRegister = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_START_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                confirmationMsgSent: true,
                isFetching: false
            }
        case types.REGISTER_FAIL:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}

export default userRegister