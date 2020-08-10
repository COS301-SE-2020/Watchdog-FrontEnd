import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import watchdogApp from './reducer';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/',
    responseType: 'json'
});

const onSuccess = (obj) => {
    console.log({"axios_success": obj});
}
const onError = (obj) => {
    console.log({"axios_error": obj});
}


const logger = createLogger();
const store = createStore(
    watchdogApp,
    applyMiddleware(
        thunkMiddleware,
        logger,
        axiosMiddleware(client)
    )
);

export default store;