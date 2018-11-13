import * as types from './constant-types'
 
const editDemandAction = (data, cb) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/demandStatement', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }, 
            body: JSON.stringify(data)
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.ok) {
                cb()
                return dispatch(editDemandSuccess());
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(editDemandFail(err));
        })
    }
}

const startEditDemandAction = () => {
    return dispatch => {
        dispatch(editDemandStartFetching())
    }
}


const editDemandStartFetching = () => {
    return {
        type: types.EDIT_DEMAND_START_FETCHING,
    }
}

const editDemandSuccess = () => {
    return {
        type: types.EDIT_DEMAND_SUCCESS,
    }
}

const editDemandFail = err => {
    return {
        type: types.EDIT_DEMAND_FAIL,
        payload: err
    }
}

export { startEditDemandAction, editDemandAction };