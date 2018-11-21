import * as types from './constant-types'

const getProposals = (skip, link) => {
    return (dispatch) => {
        dispatch(getProposalsStartFetching())
        const linkOrDefault = link ? link : 'a';
        fetch(`/getProposals/${linkOrDefault}?skip=${skip}`, {
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
                return dispatch(getProposalsSuccess(data));
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

const getProposalsSuccess = data => {
    return {
        type: types.GET_PROPOSALS_SUCCESS,
        payload: data
    }
}

const getProposalsFail = err => {
    return {
        type: types.GET_PROPOSALS_FAIL,
        payload: err
    }
}

export default getProposals