import * as types from './constant-types'
import { handleResponse, handleError } from '../helpers/fetchHandlers'

const getDemandsById = () => {

    return (dispatch) => {
        dispatch(getDemandsByIdStartFetching)
        const token = localStorage.getItem('access_token');
        fetch(`/auth/getDemandsById`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }, 
        })
        .then(handleResponse)
        .then((data) => {
            dispatch(getDemandsByIdSuccess(data));
        })
        .catch(res => {
            dispatch(getDemandsByIdFail);
            handleError(res, dispatch)
        })
    }
}

const getDemandsByIdStartFetching = {
    type: types.GET_DEMANDS_BY_ID_START_FETCHING,
}


const getDemandsByIdSuccess = demands => {
    return {
        type: types.GET_DEMANDS_BY_ID_SUCCESS,
        payload: demands
    }
}

const getDemandsByIdFail = {
    type: types.GET_DEMANDS_BY_ID_FAIL,
}

export default getDemandsById