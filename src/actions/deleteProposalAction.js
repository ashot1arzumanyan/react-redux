import * as types from './constant-types'
import getSumOfAction from './getSumOfAction'
import { handleResponseWithoutData, handleError } from '../helpers/fetchHandlers'

const deleteProposal = (_id) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/proposalStatement', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${access_token}` 
            },
            body: JSON.stringify({_id: _id})})
            .then(handleResponseWithoutData)
            .then(() => {
                setTimeout(() => {
                    dispatch(getSumOfAction())
                }, 2000);
                dispatch(deleteProposalSuccess(_id))
            })
            .catch(res => {
                handleError(res, dispatch)
            })
    }
}

const deleteProposalSuccess = (id) => {
    return {
        type: types.DELETE_PROPOSAL_SUCCESS,
        payload: id
    }
}

export default deleteProposal