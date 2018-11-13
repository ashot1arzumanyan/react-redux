import * as types from '../actions/constant-types'

const initialState = {
    isFetching: false,
    proposalsById: [],
    errors: []
}

const proposalsById = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PROPSALS_BY_ID_START_FETCHING:
            return {
                ...state,
                isFetching: true
            } 
        case types.GET_PROPOSALS_BY_ID_SUCCESS:
            return {
                ...state,
                proposalsById: action.payload,
                errors: [],
                isFetching: false
            } 
        case types.GET_PROPOSALS_BY_ID_FAIL:
            return {
                ...state,
                errors: action.payload,
                isFetching: false 
            } 
        case types.DELETE_PROPOSAL_SUCCESS:
            const id = action.payload
            return {
                ...state,
                proposalsById: state.proposalsById.filter(proposal => proposal._id !== id)
            }
        case types.DELETE_PROPOSAL_FAIL:
            return {
                ...state,
                errors: action.payload
            }    

        default:
            return state
    }
}

export default proposalsById;