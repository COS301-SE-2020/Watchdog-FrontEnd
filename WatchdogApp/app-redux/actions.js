import * as actionTypes from './actionTypes';

export function startLoading(component, message) {
    return {
        type: actionTypes.STARTED_LOADING,
        payload: {
            component: component,
            message: message
        }
    }
}

export function doneLoading(component, success, message) {
    return {
        type: actionTypes.COMPLETED_LOADING,
        payload: { component, success, message }
    }
}

export function loadData(data) {
    return {
        type: actionTypes.LOADED_DATA,
        payload: { data }
    }
}

export function makeRequest(api_route, component, message) {
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios(api_route).then((res) => {
            //FIXME: Get data properly (right now it is assumed to be in '.data')
            dispatch(loadData(res.data));
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}