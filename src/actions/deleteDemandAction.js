import * as types from './constant-types'

const deleteDemand = (_id, history) => {
    return dispatch => {
        const access_token = localStorage.getItem('access_token');
        fetch('/demandStatement', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${access_token}` 
            },
            body: JSON.stringify({_id: _id})})
            .then((res) => {
                if (res.redirected) {
                    history.push('/login')
                    const data = {ok: false}
                    return data
                }
                return res.json();
            })
            .then((data) => {
                if(data.ok) {
                    console.log(data);
                    return dispatch(deleteDemandSuccess(_id))
                }
                throw new Error(data.errors || 'Something wrong')
            })
            .catch(err => {
                console.error(err);
                return deleteDemandFail(err)
            })
    }
}

const deleteDemandSuccess = (id) => {
    return {
        type: types.DELETE_DEMAND_SUCCESS,
        payload: id
    }
}

const deleteDemandFail = (errors) => {
    return {
        type: types.DELETE_DEMAND_FAIL,
        payload: errors
    }
}

export default deleteDemand