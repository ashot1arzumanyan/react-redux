import * as types from './constant-types'
import getSumOfAction from './getSumOfAction'
import { handleResponseWithoutData, handleError } from '../helpers/fetchHandlers'

const deleteDemand = (_id) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/auth/demandStatement', {
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
                dispatch(deleteDemandSuccess(_id))
            })
            .catch(res => {            
                handleError(res, dispatch)
            })
    }
}

const deleteDemandSuccess = (id) => {
    return {
        type: types.DELETE_DEMAND_SUCCESS,
        payload: id
    }
}

export default deleteDemand