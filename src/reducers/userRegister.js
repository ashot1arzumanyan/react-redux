import * as types from '../actions/constant-types';

const initialState = {
    isFetching: false,
    confirmationMsgSent: false,
    email: '',
    username: '',
    errors: []
}

const userRegister = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                confirmationMsgSent: true,
                errors: []
            }
        case types.REGISTER_FAIL:
            return {
                ...state,
                ...action.err
            }
        default:
            return state
    }
}

export default userRegister