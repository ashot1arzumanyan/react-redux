import * as types from './constant-types'

const getProposalsById = (_id) => {
    return (dispatch) => {
        dispatch(getProposalsByIdStartFetching())
        fetch(`/getProposalsById?_id=${_id}`, {
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
                return dispatch(getProposalsByIdSuccess(data.proposalsById));
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(getProposalsByIdFail(err));
        })
    }
}

const getProposalsByIdStartFetching = () => {
    return {
        type: types.GET_PROPSALS_BY_ID_START_FETCHING,
    }
}

const getProposalsByIdSuccess = proposals => {
    return {
        type: types.GET_PROPOSALS_BY_ID_SUCCESS,
        payload: proposals
    }
}

const getProposalsByIdFail = err => {
    return {
        type: types.GET_PROPOSALS_BY_ID_FAIL,
        payload: err
    }
}

export default getProposalsById