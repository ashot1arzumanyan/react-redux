import React, { Component } from 'react';
import { Provider } from 'react-redux'
import moment from 'moment'
import 'moment/locale/hy-am'
import 'moment/locale/ru'

import './bootstrap.css'
import './app.css'

import store from './store'
import Navigation from './components/Navigation'
import getContentByLang from './actions/getContentByLang'
import checkToken from './actions/checkTokenAction'

if (localStorage.lang) {
  store.dispatch(getContentByLang(localStorage.lang));
  if (localStorage.lang === 'hy') {
    moment.locale('hy-am')
  } else {
    moment.locale(localStorage.lang)
  }
} else {
  store.dispatch(getContentByLang('hy'));
  moment.locale('hy-am')
}
store.dispatch(checkToken());


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;