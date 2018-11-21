import * as types from './constant-types'

const getDemands = (skip, link) => {
    return (dispatch) => {
        const linkOrDefault = link ? link : 'a';
        dispatch(getDemandsStartFetching())
        fetch(`/getDemands/${linkOrDefault}?skip=${skip}`, {
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
                return dispatch(getDemandsSuccess(data));
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

const getDemandsSuccess = data => {
    return {
        type: types.GET_DEMANDS_SUCCESS,
        payload: data
    }
}

const getDemandsFail = err => {
    return {
        type: types.GET_DEMANDS_FAIL,
        payload: err
    }
}

export default getDemands