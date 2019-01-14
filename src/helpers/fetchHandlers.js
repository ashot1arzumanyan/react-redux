import { addErrors } from '../actions/addDeleteErrorAction'
import logoutAction from '../actions/logoutAction'
import { history } from '../components/Navigation'

export const handleResponse = (res) => {
  if (!res.ok) {
    throw res
  }   
  return res.json()
    .then(json => json)
    .catch(() => {
      res.isNotJson = true
      return Promise.reject(res)
    })
}

export const handleResponseWithoutData = (res) => {
  if (!res.ok) {
    throw res
  }  
  return null
}

export const handleError = (res, dispatch) => {
  if (res.status === 403) {
    dispatch(logoutAction(() => history.push('/')));
    console.log(res.statusText);
    return
  }
  if (res.isNotJson) {
    console.log(res.statusText);
  } else {
    try {
      if (res.headers.get('content-type').indexOf('application/json') !== -1) {
        res.json()
          .then(json => {
            if (json.errors && Array.isArray(json.errors)) {
              console.log(json.errors);
              if (dispatch) dispatch(addErrors(json.errors))
            } else {
              console.log(typeof json.errors);
            }
          })
          .catch(err => console.log(err))
      }
    } catch(e) {
      console.log(e);
    }
  }
}