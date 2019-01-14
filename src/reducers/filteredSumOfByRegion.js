import * as types from '../actions/constant-types'

const initialState = {
    city: {
        proposals: {},
        demands: {}
    },
    type: {
        proposals: {},
        demands: {}
    },
    subType: {
        proposals: {},
        demands: {}
    }
}

const filteredSumOfByRegion = (state = initialState, action) => {
    switch (action.type) {
        case types.REGION_FILTERS_SUM_OF:
            return {
                ...state,
                city: {
                    proposals: action.payload.proposals.sumOfCity,
                    demands: action.payload.demands.sumOfCity
                },
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

export default filteredSumOfByRegion