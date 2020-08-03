import { combineReducers } from 'redux';
import { produce } from 'immer';
import * as actions from './actionTypes';

var defaultState = require('./defaultState.json');

//README: Please see actionTypes.js for explinations of what the actions do 'rr
function userDataReducer(state = defaultState.UserData, action) {
    switch (action.type) {
        case actions.STARTED_LOADING:
            return produce(state, draftState => {
                draftState[action.payload.component]['is_loading'] = true;
            });
        case actions.COMPLETED_LOADING:
            return produce(state, draftState => {
                draftState[action.payload.component]['is_loading'] = false;
                draftState[action.payload.component]['success'] = action.payload.success;
                draftState[action.payload.component]['message'] = action.payload.message;
            });
        case actions.LOADED_DATA:
            return produce(state, draftState => {
                draftState = {...state, ...action.payload.data};
            });
    
        default:
            return state;
    }
}

function artefactsReducer(state = defaultState.Artefacts, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function statisticsReducer(state = defaultState.Statistics, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const watchdogApp = combineReducers(
    userDataReducer,
    artefactsReducer,
    statisticsReducer
);

export default watchdogApp;