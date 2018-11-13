import * as types from '../actions/constant-types'

const initialState = {
    isLoaded: false,
    isFetchingGet: false,
    isFetchingAddNew: false,
    demands: []
}

const demands = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DEMANDS_START_FETCHING:
            return {
                ...state,
                isFetchingGet: true
            } 
        case types.GET_DEMANDS_SUCCESS:
            return {
                ...state,
                demands: action.payload,
                isLoaded: true,
                isFetchingGet: false
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
                isFetchingAddNew: false
            }
        case types.SAVE_DEMAND_FAIL:
            return {
                ...state,
                isFetchingAddNew: false
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