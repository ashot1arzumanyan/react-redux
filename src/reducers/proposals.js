import * as types from '../actions/constant-types'

const initialState = {
    isFetchingGet: false,
    isFetchingAddNew: false,
    proposals: [],
    errors: []
}

const proposals = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PROPSALS_START_FETCHING:
            return {
                ...state,
                isFetchingGet: true
            } 
        case types.GET_PROPOSALS_SUCCESS:
            return {
                ...state,
                proposals: action.payload,
                errors: [],
                isFetchingGet: false
            } 
        case types.GET_PROPOSALS_FAIL:
            return {
                ...state,
                errors: action.payload,
                isFetchingGet: false 
            }  
        case types.SAVE_PROPOSAL_START_FETCHING:
            return {
                ...state,
                isFetchingAddNew: true
            }
        case types.SAVE_PROPOSAL_SUCCESS:
            return {
                ...state,
                isFetchingAddNew: false
            } 
        case types.SAVE_PROPOSAL_FAIL:
            return {
                ...state,
                errors: action.payload,
                isFetchingAddNew: false
            } 
        case types.EDIT_PROPOSAL_START_FETCHING:
            return {
                ...state,
                isFetchingAddNew: true
            }
        case types.EDIT_PROPOSAL_SUCCESS:
            return {
                ...state,
                isFetchingAddNew: false
            } 
        case types.EDIT_PROPOSAL_FAIL:
            return {
                ...state,
                errors: action.payload,
                isFetchingAddNew: false
            }  
        default:
            return state
    }
}

export default proposals;