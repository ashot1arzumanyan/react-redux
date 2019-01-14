import * as types from './constant-types'

const getSumOfAction = () => {
    return (dispatch) => {
        fetch('/getSumOf', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
        })
        .then(res => res.json())
        .then((data) => {
            dispatch(getSumOfSuccess(data));
        })
        .catch(err => console.log(err))
    }
}

const getSumOfSuccess = data => {
    return {
        type: types.GET_SUM_OF_SUCCESS,
        payload: data
    }
}

export default getSumOfAction