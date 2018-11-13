import * as types from './constant-types'

const deleteProposal = (_id, history) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/proposalStatement', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${access_token}` 
            },
            body: JSON.stringify({_id: _id})})
            .then((res) => {
                if (res.redirected) {
                    history.push('/login')
                    const data = {ok: false}
                    return data
                }
                return res.json();
            })
            .then((data) => {
                if(data.ok) {
                    console.log(data);
                    return dispatch(deleteProposalSuccess(_id))
                }
                throw new Error(data.errors || 'Something wrong')
            })
            .catch(err => {
                console.error(err);
                return dispatch(deleteProposalFail(err))
            })
    }
}

const deleteProposalSuccess = (id) => {
    return {
        type: types.DELETE_PROPOSAL_SUCCESS,
        payload: id
    }
}

const deleteProposalFail = (errors) => {
    return {
        type: types.DELETE_PROPOSAL_FAIL,
        payload: errors
    }
}

export default deleteProposal