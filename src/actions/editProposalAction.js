import * as types from './constant-types'

const editProposalAction = (data, cb) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/proposalStatement', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)})
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.ok) {
                    cb()
                    return dispatch(editProposalSuccess());
                }
                throw new Error(data.errors || 'Something wrong')
            })
            .catch(err => {
                console.error(err);
                dispatch(editProposalFail(err));
            })
    }
}

const startEditProposalAction = () => {
    return dispatch => {
        dispatch(editProposalStartFetching())
    }
}


const editProposalStartFetching = () => {
    return {
        type: types.EDIT_PROPOSAL_START_FETCHING,
    }
}

const editProposalSuccess = data => {
    return {
        type: types.EDIT_PROPOSAL_SUCCESS,
        payload: data
    }
}

const editProposalFail = err => {
    return {
        type: types.EDIT_PROPOSAL_FAIL,
        payload: err
    }
}

export { startEditProposalAction, editProposalAction };