import { combineReducers } from 'redux';
import { produce } from 'immer';
import * as actions from './actionTypes';

var defaultState = require('./defaultState.json');

function dataReducer(state = defaultState.UserData, action) {
    switch (action.type) {
        case actions.SUCCESS_GET_USER_DATA:
            return produce(state, draft => {
                draft.control_panel = action.payload.data.data.control_panel
                draft.logs = action.payload.data.data.logs
                draft.name = action.payload.data.data.name
                draft.preferences = action.payload.data.data.preferences
                draft.security_level = action.payload.data.data.security_level
                draft.identities = action.payload.data.data.identities
                console.log("GOT_USER_DATA");
                console.log(draft)
            })
        case actions.SUCCESS_GET_RECORDINGS:
            return produce(state, draftState => {
                draftState.videos = action.payload.data.data.videos
                draftState.locations = action.payload.data.data.locations
            })
        case actions.SUCCESS_GET_IDENTITIES:
            return produce(state, draft => {
                draft.identities.whitelist = action.payload.data.data.identities.whitelist
            })
        case actions.SUCCESS_GET_LOGS:
            return produce(state, draft => {
                draft.logs = action.payload.data.data.logs
            })

        case actions.ERROR_GET_USER_DATA:
            return state
        case actions.ERROR_GET_RECORDINGS:
            return state
        case actions.ERROR_GET_IDENTITIES:
            return state
        case actions.ERROR_GET_LOGS:
            return state
        default:
            return state;
    }
}

function uiReducer(state = defaultState.UI, action) {
    switch (action.type) {
        case actions.GET_USER_DATA:
            return produce(state, draft => {
                draft.Identities.loading = true
                draft.Logs.loading = true
            })
        case actions.GET_IDENTITIES:
            return produce(state, draft => {
                draft.Identities.loading = true
            })
        case actions.GET_RECORDINGS:
            return produce(state, draftState => {
                draftState.Recordings.loading = true
            })
        case actions.GET_RECORDINGS:
            return produce(state, draftState => {
                draftState.Logs.loading = true
            })

        case actions.SUCCESS_GET_USER_DATA:
            return produce(state, (draftState) => {
                draftState.Identities.loading = false
                draftState.Logs.loading = false
            })
        case actions.SUCCESS_GET_RECORDINGS:
            return produce(state, (draftState) => {
                draftState.Recordings.loading = false
            })
        case actions.SUCCESS_GET_IDENTITIES:
            return produce(state, (draftState) => {
                draftState.Identities.loading = false
            })
        case actions.SUCCESS_GET_LOGS:
            return produce(state, (draftState) => {
                draftState.Logs.loading = false
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