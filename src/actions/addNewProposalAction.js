import * as types from './constant-types'

const addNewProposalAction = (data, cb) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/addNewProposal', {
            method: 'POST',
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
                    return dispatch(saveProposalSuccess(data));
                }
                throw new Error(data.errors || 'Something wrong')
            })
            .catch(err => {
                console.error(err);
                dispatch(saveProposalFail(err));
            })
    }
}

const startAddNewProposalAction = () => {
    return dispatch => {
        dispatch(addNewProposalStartFetching())
    }
}


const addNewProposalStartFetching = () => {
    return {
        type: types.SAVE_PROPOSAL_START_FETCHING,
    }
}

const saveProposalSuccess = data => {
    return {
        type: types.SAVE_PROPOSAL_SUCCESS,
        payload: data
    }
}

const saveProposalFail = err => {
    return {
        type: types.SAVE_PROPOSAL_FAIL,
        payload: err
    }
}

export { startAddNewProposalAction, addNewProposalAction };