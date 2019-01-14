import * as types from '../actions/constant-types'

const initialState = {
    descriptions: { 
        skip: 0,
        count: 10,
        isFetchingGet: false,
        isFetchingAddNew: false,
        linkToCachedAll: 'a'
    },
    proposals: [],
    errors: [],
}

const proposals = (state = initialState, action) => {
    const descriptions = {...state.descriptions};
    switch (action.type) {
        case types.GET_PROPSALS_START_FETCHING:
            descriptions.isFetchingGet = true
            return {
                ...state,
                descriptions: descriptions 
            } 
        case types.GET_PROPOSALS_SUCCESS:
            const { proposals, skip, count, linkToCachedAll } = action.payload
            descriptions.skip = skip ? skip : descriptions.count;
            count && (descriptions.count = count);
            descriptions.isFetchingGet = false;
            linkToCachedAll && (descriptions.linkToCachedAll = linkToCachedAll);
            return {
                ...state,
                proposals: [...state.proposals, ...proposals],
                errors: [],
                descriptions: descriptions
            } 
            
        case types.GET_PROPOSALS_FAIL:
            descriptions.isFetchingGet = false
            return {
                ...state,
                errors: action.payload,
                descriptions: descriptions
            }  
        case types.SAVE_PROPOSAL_START_FETCHING:
            descriptions.isFetchingAddNew = true
            return {
                ...state,
                descriptions: descriptions
            }
        case types.SAVE_PROPOSAL_SUCCESS:
            descriptions.skip += 1;
            descriptions.count += 1;
            descriptions.isFetchingAddNew = false;
            return {
                ...state,
                proposals: [ ...action.payload, ...state.proposals ],
                descriptions: descriptions
            } 
        case types.SAVE_PROPOSAL_FAIL:
            descriptions.isFetchingAddNew = false
            return {
                ...state,
                errors: action.payload,
                descriptions: descriptions
            } 
        case types.DELETE_PROPOSAL_SUCCESS:
            const proposalsWithoutDeletedItem = state.proposals.filter(
                p => p._id !== action.payload 
            );
            descriptions.skip < 1 || (descriptions.skip -= 1);
            descriptions.count < 1 || (descriptions.count -= 1);
            return {
                ...state,
                proposals: proposalsWithoutDeletedItem,
                descriptions: descriptions
            } 
        case types.DELETE_PROPOSAL_FAIL:
            return {
                ...state,
                errors: action.payload,
            } 
        case types.EDIT_PROPOSAL_START_FETCHING:
            descriptions.isFetchingAddNew = true
            return {
                ...state,
                descriptions: descriptions
            }
        case types.EDIT_PROPOSAL_SUCCESS:
            descriptions.isFetchingAddNew = false
            const newProposals = state.proposals.slice()
            const indexOfEditedProposal = newProposals.findIndex(proposal => proposal._id === action.payload._id)
            newProposals.splice(indexOfEditedProposal, 1, action.payload)
            return {
                ...state,
                descriptions: descriptions,
                proposals: newProposals
            } 
        case types.EDIT_PROPOSAL_FAIL:
            descriptions.isFetchingAddNew = false
            return {
                ...state,
                errors: action.payload,
                descriptions: descriptions
            }  
        default:
            return state
    }
}

export default proposals;