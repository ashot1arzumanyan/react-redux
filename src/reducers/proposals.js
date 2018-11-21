import * as types from '../actions/constant-types'

const initialState = {
    skip: 0,
    count: 10,
    isFetchingGet: false,
    isFetchingAddNew: false,
    proposals: [],
    errors: [],
    linkToCachedAll: 'a'
}

const proposals = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PROPSALS_START_FETCHING:
            return {
                ...state,
                isFetchingGet: true
            } 
        case types.GET_PROPOSALS_SUCCESS:
            const { proposals, skip, count, linkToCachedAll } = action.payload
            return {
                ...state,
                proposals: [...state.proposals, ...proposals],
                skip: skip ? skip : state.count,
                count: count ? count : state.count,
                errors: [],
                isFetchingGet: false,
                linkToCachedAll: linkToCachedAll ? linkToCachedAll : state.linkToCachedAll
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
                proposals: [ ...action.payload, ...state.proposals ],
                skip: state.skip + 1,
                count: state.count + 1,
                isFetchingAddNew: false
            } 
        case types.SAVE_PROPOSAL_FAIL:
            return {
                ...state,
                errors: action.payload,
                isFetchingAddNew: false
            } 
        case types.DELETE_PROPOSAL_SUCCESS:
            const proposalsWithoutDeletedItem = state.proposals.filter(
                p => p._id !== action.payload 
            )
            return {
                ...state,
                proposals: proposalsWithoutDeletedItem,
                skip: state.skip === 0 ? 0 : state.skip - 1,
                count: state.count === 0 ? 0 : state.count - 1
            } 
        case types.DELETE_PROPOSAL_FAIL:
            return {
                ...state,
                errors: action.payload,
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