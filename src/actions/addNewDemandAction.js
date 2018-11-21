import * as types from './constant-types'
 
const addNewDemandAction = (data, cb) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/addNewDemand', {
            method: 'POST',
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
                return dispatch(saveDemandSuccess(data.demand));
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(saveDemandFail(err));
        })
    }
}

const startAddNewDemandAction = () => {
    return dispatch => {
        dispatch(addNewDemandStartFetching())
    }
}


const addNewDemandStartFetching = () => {
    return {
        type: types.SAVE_DEMAND_START_FETCHING,
    }
}

const saveDemandSuccess = demand => {
    return {
        type: types.SAVE_DEMAND_SUCCESS,
        payload: [demand]
    }
}

const saveDemandFail = err => {
    return {
        type: types.SAVE_DEMAND_FAIL,
        payload: err
    }
}

export { startAddNewDemandAction ,addNewDemandAction };