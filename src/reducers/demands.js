import * as types from '../actions/constant-types'

const initialState = {
    skip: 0,
    count: 10,
    isFetchingGet: false,
    isFetchingAddNew: false,
    demands: [], 
    errors: [],
    linkToCachedAll: 'a'
}

const demands = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DEMANDS_START_FETCHING:
            return {
                ...state,
                isFetchingGet: true
            } 
        case types.GET_DEMANDS_SUCCESS:
            const { demands, skip, count, linkToCachedAll } = action.payload
            return {
                ...state,
                demands: [...state.demands, ...demands],
                skip: skip ? skip : state.count,
                count: count ? count : state.count,
                errors: [],
                isFetchingGet: false,
                linkToCachedAll: linkToCachedAll ? linkToCachedAll : state.linkToCachedAll
            } 
        case types.GET_DEMANDS_FAIL:
            return {
                ...state,
                ...action.payload,
                isFetchingGet: false
            }   
        case types.SAVE_DEMAND_START_FETCHING:
            return {
                ...state,
                isFetchingAddNew: true
            }
        case types.SAVE_DEMAND_SUCCESS:
            return {
                ...state,
                demands: [ ...action.payload, ...state.demands ],
                skip: state.skip + 1,
                count: state.count + 1,
                isFetchingAddNew: false
            }
        case types.SAVE_DEMAND_FAIL:
            return {
                ...state,
                isFetchingAddNew: false
            }
        case types.DELETE_DEMAND_SUCCESS:
            const demandsWithoutDeletedItem = state.demands.filter(
                d => d._id !== action.payload 
            )
            return {
                ...state,
                demands: demandsWithoutDeletedItem,
                skip: state.skip === 0 ? 0 : state.skip - 1,
                count: state.count === 0 ? 0 : state.count - 1
            }
        case types.DELETE_DEMAND_FAIL:
            return {
                ...state,
                errors: action.payload
            }
        case types.EDIT_DEMAND_START_FETCHING:
            return {
                ...state,
                isFetchingAddNew: true
            }
        case types.EDIT_DEMAND_SUCCESS:
            return {
                ...state,
                isFetchingAddNew: false
            }
        case types.EDIT_DEMAND_FAIL:
            return {
                ...state,
                isFetchingAddNew: false
            }
        default:
            return state
    }
}

export default demands;