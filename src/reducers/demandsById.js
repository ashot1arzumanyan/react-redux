import * as types from '../actions/constant-types'

const initialState = {
    isLoaded: false,
    isFetching: false,
    demandsById: [],
    errors: []
}

const demandsById = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DEMANDS_BY_ID_START_FETCHING:
            return {
                ...state,
                isFetching: true
            } 
        case types.GET_DEMANDS_BY_ID_SUCCESS:
            return {
                ...state,
                demandsById: action.payload,
                isLoaded: true,
                isFetching: false,
                errors: []
            } 
        case types.GET_DEMANDS_BY_ID_FAIL:
            return {
                ...state,
                ...action.payload,
                isFetching: false,
            }
        case types.DELETE_DEMAND_SUCCESS: 
            const id = action.payload
            return {
                ...state,
                demandsById: state.demandsById.filter(demand => demand._id !== id)
            }          

        case types.DELETE_DEMAND_FAIL:
            return {
                ...state,
                errors: action.payload
            }    

        default:
            return state
    }
}

export default demandsById;