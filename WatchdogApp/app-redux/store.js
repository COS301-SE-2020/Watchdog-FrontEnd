import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import { createLogger } from 'redux-logger'
import { multiClientMiddleware } from 'redux-axios-middleware';
import watchdogApp from './reducer';

const apiClient = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/',
    responseType: 'json'
});

const genericClient = axios.create();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = createLogger({})
const store = createStore(
    watchdogApp,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            multiClientMiddleware(
                {
                    default: {client: apiClient},
                    generic: {client: genericClient}
                }
            ),
            logger
        )
    )

)

export default store;