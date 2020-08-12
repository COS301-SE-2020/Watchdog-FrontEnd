import { combineReducers } from 'redux';
import { produce } from 'immer';
import * as actions from './actionTypes';

var defaultState = require('./defaultState.json');

/**
 * Data Reducer to perform Data updates only
 * @param {*} state UserData update to give/update data in store
 * @param {*} action Redux Action
 */
function dataReducer(state = defaultState.UserData, action) {
    switch (action.type) {
        case actions.GET_USER_DATA_SUCCESS:
            return produce(state, draft => {
                draft.control_panel = action.payload.data.data.control_panel
                draft.logs = action.payload.data.data.logs
                draft.name = action.payload.data.data.name
                draft.preferences = action.payload.data.data.preferences
                draft.security_level = action.payload.data.data.security_level
                draft.identities = action.payload.data.data.identities
            })
        case actions.GET_RECORDINGS_SUCCESS:
            return produce(state, draftState => {
                draftState.videos = action.payload.data.data.videos
                draftState.locations = action.payload.data.data.locations
            })
        case actions.GET_IDENTITIES_SUCCESS:
            return produce(state, draft => {
                draft.identities.whitelist = action.payload.data.data.identities.whitelist
            })
        case actions.GET_LOGS_SUCCESS:
            return produce(state, draft => {
                draft.logs = action.payload.data.data.logs
            })
    }
}

/**
 * UI Reducer to Map progress of API and other such related business logic
 * @param {*} state UI component states to indicate progression of API calls
 * @param {*} action Redux Action
 */
function uiReducer(state = defaultState.UI, action) {
    switch (action.type) {
        /**
         * Loading Notifiers
         */
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

        /**
         * Success Notifiers
         */
        case actions.GET_USER_DATA_SUCCESS:
            return produce(state, (draftState) => {
                draftState.Identities.loading = false
                draftState.Logs.loading = false
            })
        case actions.GET_RECORDINGS_SUCCESS:
            return produce(state, (draftState) => {
                draftState.Recordings.loading = false
            })
        case actions.GET_IDENTITIES_SUCCESS:
            return produce(state, (draftState) => {
                draftState.Identities.loading = false
            })
        case actions.GET_LOGS_SUCCESS:
            return produce(state, (draftState) => {
                draftState.Logs.loading = false
            })
        
        /**
         * Fail notifiers
         */
        //FIXME: Implement better error handling
        case actions.GET_USER_DATA_FAIL:
            return state
        case actions.GET_RECORDINGS_FAIL:
            return state
        case actions.GET_IDENTITIES_FAIL:
            return state
        case actions.GET_LOGS_FAIL:
            return state
        default:
            return state;
        default:
            return state;
    }
}

function statisticsReducer(state = {}, action) {
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