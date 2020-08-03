import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import watchdogApp from './reducer';
 
const logger = createLogger();
const store = createStore(
    watchdogApp,
    applyMiddleware(
        thunkMiddleware,
        logger
    )
);

export default store;