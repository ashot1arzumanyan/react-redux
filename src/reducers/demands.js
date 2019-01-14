import * as types from '../actions/constant-types'

const initialState = {
    descriptions: {
        skip: 0,
        count: 10,
        isFetchingGet: false,
        isFetchingAddNew: false,
        linkToCachedAll: 'a',
    },
    demands: [] 
}

const demands = (state = initialState, action) => {
    const descriptions = {...state.descriptions};
    switch (action.type) {
        case types.GET_DEMANDS_START_FETCHING:
            descriptions.isFetchingGet = true
            return {
                ...state,
                descriptions: descriptions 
            } 
        case types.GET_DEMANDS_SUCCESS:
            const { demands, skip, count, linkToCachedAll } = action.payload;
            descriptions.skip = skip ? skip : descriptions.count;
            count && (descriptions.count = count);
            descriptions.isFetchingGet = false;
            linkToCachedAll && (descriptions.linkToCachedAll = linkToCachedAll);
            return {
                ...state,
                demands: [...state.demands, ...demands],
                descriptions: descriptions,
                errors: []
            } 
        case types.GET_DEMANDS_FAIL:
            descriptions.isFetchingGet = false
            return {
                ...state,
                ...action.payload,
                descriptions: descriptions
            }   
        case types.SAVE_DEMAND_START_FETCHING:
            descriptions.isFetchingAddNew = true
            return {
                ...state,
                descriptions: descriptions
            }
        case types.SAVE_DEMAND_SUCCESS:
            descriptions.skip += 1;
            descriptions.count += 1;
            descriptions.isFetchingAddNew = false;
            return {
                ...state,
                demands: [ ...action.payload, ...state.demands ],
                descriptions: descriptions
            }
        case types.SAVE_DEMAND_FAIL:
            descriptions.isFetchingAddNew = false
            return {
                ...state,
                descriptions: descriptions
            }
        case types.DELETE_DEMAND_SUCCESS:
            const demandsWithoutDeletedItem = state.demands.filter(
                d => d._id !== action.payload 
            );
            descriptions.skip < 1 || (descriptions.skip -= 1);
            descriptions.count < 1 || (descriptions.count -= 1);
            return {
                ...state,
                demands: demandsWithoutDeletedItem,
                descriptions: descriptions
            }
        case types.DELETE_DEMAND_FAIL:
            return {
                ...state,
                errors: action.payload
            }
        case types.EDIT_DEMAND_START_FETCHING:
            descriptions.isFetchingAddNew = true
            return {
                ...state,
                descriptions: descriptions
            }
        case types.EDIT_DEMAND_SUCCESS:
            descriptions.isFetchingAddNew = false
            const newDemands = state.demands.slice()
            const indexOfEditedDemand = newDemands.findIndex(demand => demand._id === action.payload._id)
            newDemands.splice(indexOfEditedDemand, 1, action.payload)
            return {
                ...state,
                descriptions: descriptions,
                demands: newDemands
            }
        case types.EDIT_DEMAND_FAIL:
            descriptions.isFetchingAddNew = false
            return {
                ...state,
                descriptions: descriptions
            }
        default:
            return state
    }
}

export default demands;