import React from 'react';
import { Provider } from 'react-redux'
import moment from 'moment'
import 'moment/locale/hy-am'
import 'moment/locale/ru'

import store from './store'
import Navigation from './components/Navigation'
import getContentByLang from './actions/getContentByLang'
import checkToken from './actions/checkTokenAction'
import getStatementsAction from './actions/getStatementsAction'
import getSumOfAction from './actions/getSumOfAction'
import setTitle from './helpers/setTitle'
import SEO from './components/SEO/SEO'

import './bootstrap.css'
import './app.css'

store.dispatch(checkToken());

class App extends React.Component {

  componentDidMount() {
    store.dispatch(getStatementsAction(0, 'a', 0, 'a'));
    
    if (localStorage.lang) {
      store.dispatch(getContentByLang(localStorage.lang));
      if (localStorage.lang === 'hy') {
        moment.locale('hy-am')
      } else {
        setTitle(localStorage.lang)
        moment.locale(localStorage.lang)
      }
    } else {
      store.dispatch(getContentByLang('hy'));
      moment.locale('hy-am')
    }

    store.dispatch(getSumOfAction())

    setTimeout(() => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-131227506-1');
    }, 200);
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Navigation />
          <SEO />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;