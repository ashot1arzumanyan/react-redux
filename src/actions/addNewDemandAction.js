import * as types from './constant-types'
import getSumOfAction from './getSumOfAction'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const addNewDemandAction = (data, cb) => {
    return dispatch => {
        dispatch(addNewDemandStartFetching)
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/demandStatement', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)
        })
        .then(handleResponse)
        .then((data) => {
            dispatch(saveDemandSuccess(data));
            setTimeout(() => {
                dispatch(getSumOfAction())
            }, 2000);
            cb()
        })
        .catch(res => {
            dispatch(saveDemandFail);
            handleError(res, dispatch)
        })
    }
}

const addNewDemandStartFetching = {
        type: types.SAVE_DEMAND_START_FETCHING,
    }

const saveDemandSuccess = demand => {
    return {
        type: types.SAVE_DEMAND_SUCCESS,
        payload: [demand]
    }
}

const saveDemandFail = {
    type: types.SAVE_DEMAND_FAIL,
}

export default addNewDemandAction