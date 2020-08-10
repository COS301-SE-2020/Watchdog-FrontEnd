import { combineReducers } from 'redux';
import { produce } from 'immer';
import * as actions from './actionTypes';

var defaultState = require('./defaultState.json');

//README: Please see actionTypes.js for explinations of what the actions do 'rr
function dataReducer(state = defaultState.UserData, action) {
    // console.log(action);
    switch (action.type) {
        case actions.SUCCESS_GET_RECORDINGS:
            // console.log(action.payload.data)
            // return state
            return produce(state, draftState => {
                draftState.videos = action.payload.data.data.videos
            })
        default:
            return state;
    }
}

function uiReducer(state=defaultState.UI, action) {
    // console.log(action);
    // console.log(state);
    switch (action.type) {
        case actions.STARTED_LOADING:
            console.log(actions.STARTED_LOADING);
            return produce(state, draftState => {
                draftState[action.component]['loading'] = true
                draftState[action.component]['message'] = action.message
            })
        case actions.COMPLETED_LOADING:
            console.log(actions.COMPLETED_LOADING);
            return produce(state, (draftState) => {
                draftState[action.component]['loading'] = false
                draftState[action.component]['message'] = action.message
            })
        default:
            return state; 
    }
}

function statisticsReducer(state = {}, action) {
    // console.log(action);
    switch (action.type) {
        default:
            return state
    }
}

const watchdogApp = combineReducers(
    {
        "Data": dataReducer,
        "UI": uiReducer,
        "Statistics": statisticsReducer
    }
);

export default watchdogApp;