import thunkMiddleware from 'redux-thunk';
import { createCLILogger } from 'redux-cli-logger';
import { createStore, applyMiddleware } from 'redux';
import watchdogApp from './reducer';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/',
    responseType: 'json'
});

const logger = createCLILogger()
const store = createStore(
    watchdogApp,
    applyMiddleware(
        thunkMiddleware,
        axiosMiddleware(client),
        logger
    )
)

export default store;