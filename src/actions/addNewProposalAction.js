import * as types from './constant-types'
import getSumOfAction from './getSumOfAction'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const addNewProposalAction = (data, cb) => {
    return dispatch => {
        dispatch(addNewProposalStartFetching)
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/proposalStatement', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)})
            .then(handleResponse)
            .then((data) => {
                dispatch(saveProposalSuccess(data));
                setTimeout(() => {
                    dispatch(getSumOfAction())
                }, 2000);
                cb()
            })
            .catch(res => {
                dispatch(saveProposalFail);
                handleError(res, dispatch)
            })
    }
}

const addNewProposalStartFetching = {
    type: types.SAVE_PROPOSAL_START_FETCHING,
}

const saveProposalSuccess = proposal => {
    return {
        type: types.SAVE_PROPOSAL_SUCCESS,
        payload: [proposal]
    }
}

const saveProposalFail = {
    type: types.SAVE_PROPOSAL_FAIL,
}

export default addNewProposalAction;