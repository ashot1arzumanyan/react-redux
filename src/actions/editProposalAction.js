import * as types from './constant-types'
import getSumOfAction from './getSumOfAction'
import { handleResponse, handleError } from '../helpers/fetchHandlers' 

const editProposalAction = (data, cb) => {
    return dispatch => {
        dispatch(editProposalStartFetching)
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/proposalStatement', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)})
            .then(handleResponse)
            .then((data) => {
                dispatch(editProposalSuccess(data));
                cb();
                setTimeout(() => {
                    dispatch(getSumOfAction())
                }, 2000);
            })
            .catch(res => {
                dispatch(editProposalFail);
                handleError(res, dispatch)
            })
    }
}

const editProposalStartFetching = {
    type: types.EDIT_PROPOSAL_START_FETCHING
}

const editProposalSuccess = (proposal) => {
    return {
        type: types.EDIT_PROPOSAL_SUCCESS,
        payload: proposal
    }
}

const editProposalFail = {
    type: types.EDIT_PROPOSAL_FAIL
}

export default editProposalAction;