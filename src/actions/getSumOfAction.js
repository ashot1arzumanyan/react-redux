import * as types from './constant-types'

const getSumOfAction = () => {
    return (dispatch) => {
        fetch('/getSumOf', {
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
                return dispatch(getSumOfSuccess(data));
            }
            throw new Error(data.errors || 'Something wrong')
        })
        .catch(err => {
            console.error(err);
            dispatch(getSumOfFail(err));
        })
    }
}

const getSumOfSuccess = data => {
    return {
        type: types.GET_SUM_OF_SUCCESS,
        payload: data
    }
}

const getSumOfFail = err => {
    return {
        type: types.GET_SUM_OF_FAIL,
        payload: err
    }
}

export default getSumOfAction