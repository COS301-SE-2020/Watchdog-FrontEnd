import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import watchdogApp from './reducer';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/',
    responseType: 'json'
});

const store = createStore(
    watchdogApp,
    applyMiddleware(
        thunkMiddleware,
        axiosMiddleware(client)
    )
)

export default store;