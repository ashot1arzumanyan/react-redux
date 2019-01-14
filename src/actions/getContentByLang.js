import moment from 'moment'
import setTitle from '../helpers/setTitle'

const getContentByLang = lang => {
    setTimeout(() => {        
        if (lang === 'hy') {
            moment.locale('hy-am')
        } else {
            moment.locale(lang)
        }
        setTitle(lang)
    }, 0);
    return dispatch => {
        fetch(`/lang/${lang}`)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('lang', lang);
                dispatch(setLang(data, lang));
            })
            .catch(err => console.log(err))
    }
}

const setLang = (content, lang) => {
    return {
        type: 'SET_LANG',
        payload: {
            ...content,
            lang: lang
        }
    }
}

export default getContentByLang;