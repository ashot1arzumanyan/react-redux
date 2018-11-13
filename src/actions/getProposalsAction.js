import * as types from './constant-types'

const getProposals = () => {
    return (dispatch) => {
        dispatch(getProposalsStartFetching())
        fetch('/getProposals', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.ok) {
                return dispatch(getProposalsSuccess(data.proposals));
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(getProposalsFail(err));
        })
    }
}

const getProposalsStartFetching = () => {
    return {
        type: types.GET_PROPSALS_START_FETCHING,
    }
}

const getProposalsSuccess = proposals => {
    return {
        type: types.GET_PROPOSALS_SUCCESS,
        payload: proposals
    }
}

const getProposalsFail = err => {
    return {
        type: types.GET_PROPOSALS_FAIL,
        payload: err
    }
}

export default getProposals