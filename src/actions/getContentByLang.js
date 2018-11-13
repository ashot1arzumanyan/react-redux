import moment from 'moment'

const getContentByLang = lang => {
    return dispatch => {
        if (lang === 'hy') {
            moment.locale('hy-am')
        } else {
            moment.locale(lang)
        }
        fetch('/lang', { headers: new Headers({ 'Content-Language': lang }) })
            .then(res => {
                // console.log(res);
                return res.json()
            })
            .then(content => {
                // console.log(content);
                localStorage.setItem('lang', lang);
                dispatch(setLang(content));
            })
            .catch(err => console.log(err))
    }
}

const setLang = (content) => {
    return {
        type: 'SET_LANG',
        payload: content
    }
}

export default getContentByLang;