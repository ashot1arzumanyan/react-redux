import * as types from './constant-types'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const getProposalsById = () => {
    return (dispatch) => {
        dispatch(getProposalsByIdStartFetching)
        const token = localStorage.getItem('access_token');
        fetch('/auth/getProposalsById', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }, 
        })
        .then(handleResponse)
        .then((data) => {
            dispatch(getProposalsByIdSuccess(data));
        })
        .catch(res => {
            dispatch(getProposalsByIdFail);
            handleError(res, dispatch)
        })
    }
}

const getProposalsByIdStartFetching = {
    type: types.GET_PROPSALS_BY_ID_START_FETCHING,
}

const getProposalsByIdSuccess = proposals => {
    return {
        type: types.GET_PROPOSALS_BY_ID_SUCCESS,
        payload: proposals
    }
}

const getProposalsByIdFail = {
    type: types.GET_PROPOSALS_BY_ID_FAIL,
}

export default getProposalsById