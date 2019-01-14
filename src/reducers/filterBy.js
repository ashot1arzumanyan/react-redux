const initialState = {
    region: null,
    city: null,
    type: null,
    subType: null
}

const filterBy = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FILTER':
            return {
                ...state,
                ...action.payload
            }
        case 'DELETE_FILTER':
            return {
                ...state,
                [action.payload]: null
            }
        case 'RESET_FILTERS': 
            return {
                ...state,
                ...initialState
            }
    
        default:
            return state
    }
}

export default filterBy