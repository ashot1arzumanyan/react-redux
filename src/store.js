import { applyMiddleware, createStore } from 'redux'                                                                                                                 
import thunk from 'redux-thunk'                                                                                                                                      
import reducers from './reducers'

let store;
if (process.env.NODE_ENV === 'production') {
  const middleware = applyMiddleware(thunk);
  store = createStore(reducers, middleware)
} else {
  const { createLogger } = require('redux-logger');                                                                                                                          
  const { composeWithDevTools } = require('redux-devtools-extension')                                                                                                     
  const middleware = applyMiddleware(thunk, createLogger());
  store = createStore(reducers, composeWithDevTools(middleware))
}

export default store