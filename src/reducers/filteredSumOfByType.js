import * as types from '../actions/constant-types'

const initialState = {
    subType: {
        proposals: {},
        demands: {}
    }
}

const filteredSumOfByType = (state = initialState, action) => {
    switch (action.type) {
        case types.TYPE_FILTERS_SUM_OF:
            return {
                ...state,
                subType: {
                    proposals: action.payload.proposals.sumOfSubType,
                    demands: action.payload.demands.sumOfSubType,
                }
            }

        default:
            return state
    }
}

export default filteredSumOfByType