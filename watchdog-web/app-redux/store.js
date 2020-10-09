import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import { createLogger } from 'redux-logger'
import { multiClientMiddleware } from 'redux-axios-middleware';
import SocketManager from './rtcClient'

import watchdogApp from './reducer';

//Axios Client for API
const apiClient = axios.create({
    baseURL: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/',
    responseType: 'json'
});
const genericClient = axios.create();

const logger = createLogger({})

// let composeEnhancers = compose;

// if (global.window != null) {
//     composeEnhancers = global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// }
// let composeEnhancers = compose;
// try {
    // composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// }
// catch(Exception){
//     console.log('No Debug Tools')
//     composeEnhancers = compose
// }
// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composeEnhancers = (typeof window !== 'undefined')? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
    watchdogApp,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            multiClientMiddleware(
                {
                    default: { client: apiClient },
                    generic: { client: genericClient }
                }
            ),
            // logger
        )
    )

)

// SocketManager.init(store().dispatch)

export default store;