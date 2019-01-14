import * as types from '../actions/constant-types'

const initialState = {
    type: {
        proposals: {},
        demands: {}
    },
    subType: {
        proposals: {},
        demands: {}
    }
}

const filteredSumOfByCity = (state = initialState, action) => {
    switch (action.type) {
        case types.CITY_FILTERS_SUM_OF:
            return {
                ...state,
                type: {
                    proposals: action.payload.proposals.sumOfType,
                    demands: action.payload.demands.sumOfType,
                },
                subType: {
                    proposals: action.payload.proposals.sumOfSubType,
                    demands: action.payload.demands.sumOfSubType,
                }
            }

        default:
            return state
    }
}

export default filteredSumOfByCity