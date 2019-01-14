import * as types from './constant-types.js'

const getStatementsAction = (p_skip, p_link, d_skip, d_link, cb, en) => {
    return dispatch => {
        dispatch(getProposalsStartFetching)
        dispatch(getDemandsStartFetching)
        fetch(`/getStatements?p_skip=${p_skip}&p_link=${p_link}&d_skip=${d_skip}&d_link=${d_link}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
        })
        .then(response => response.json())
        .then(data => {
            dispatch(getProposalsSuccess(data.proposals))
            dispatch(getDemandsSuccess(data.demands))
            if (cb) cb(en)
        })
        .catch(err => {
            console.log(err);
        })
    }
}

const getProposalsStartFetching = {
    type: types.GET_PROPSALS_START_FETCHING,
}

const getDemandsStartFetching = {
    type: types.GET_DEMANDS_START_FETCHING,
}

const getProposalsSuccess = data => {
    return {
        type: types.GET_PROPOSALS_SUCCESS,
        payload: data
    }
}

const getDemandsSuccess = data => {
    return {
        type: types.GET_DEMANDS_SUCCESS,
        payload: data
    }
}

export default getStatementsAction