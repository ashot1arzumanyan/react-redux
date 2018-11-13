import * as types from './constant-types'

const getDemandsById = (_id) => {
    return (dispatch) => {
        dispatch(getDemandsByIdStartFetching())
        fetch(`/getDemandsById?_id=${_id}`, {
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
                return dispatch(getDemandsByIdSuccess(data.demandsById));
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(getDemandsByIdFail(err));
        })
    }
}

const getDemandsByIdStartFetching = () => {
    return {
        type: types.GET_DEMANDS_BY_ID_START_FETCHING,
    }
}

const getDemandsByIdSuccess = demands => {
    return {
        type: types.GET_DEMANDS_BY_ID_SUCCESS,
        payload: demands
    }
}

const getDemandsByIdFail = err => {
    return {
        type: types.GET_DEMANDS_BY_ID_FAIL,
        payload: err
    }
}

export default getDemandsById