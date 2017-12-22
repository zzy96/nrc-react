import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/'

const initialState = {
 loggedIn:false,
 profile:[]
}

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
 rootReducer,
 applyMiddleware(...middleware)
)

export default store
