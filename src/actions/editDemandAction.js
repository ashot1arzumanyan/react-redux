import * as types from './constant-types'
import getSumOfAction from './getSumOfAction'
import { handleResponse, handleError } from '../helpers/fetchHandlers' 

const editDemandAction = (data, cb) => {
    return dispatch => {
        dispatch(editDemandStartFetching)
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/demandStatement', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)
        })
        .then(handleResponse)
        .then((data) => {
            dispatch(editDemandSuccess(data));
            cb();
            setTimeout(() => {
                dispatch(getSumOfAction())
            }, 2000);
        })
        .catch(res => {
            dispatch(editDemandFail);
            handleError(res, dispatch)
        })
    }
}

const editDemandStartFetching = {
    type: types.EDIT_DEMAND_START_FETCHING
}

const editDemandSuccess = (demand) => { 
    return  {
        type: types.EDIT_DEMAND_SUCCESS,
        payload: demand
    }
}

const editDemandFail = {
    type: types.EDIT_DEMAND_FAIL
}

export default editDemandAction;