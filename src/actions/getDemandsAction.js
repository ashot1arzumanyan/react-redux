import * as types from './constant-types'

const getDemands = () => {
    return (dispatch) => {
        dispatch(getDemandsStartFetching())
        fetch('/getDemands', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.ok) {
                return dispatch(getDemandsSuccess(data.demands));
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(getDemandsFail(err));
        })
    }
}

const getDemandsStartFetching = () => {
    return {
        type: types.GET_DEMANDS_START_FETCHING,
    }
}

const getDemandsSuccess = demands => {
    return {
        type: types.GET_DEMANDS_SUCCESS,
        payload: demands
    }
}

const getDemandsFail = err => {
    return {
        type: types.GET_DEMANDS_FAIL,
        payload: err
    }
}

export default getDemands