import * as actionTypes from './actionTypes';
import { Auth } from 'aws-amplify'

export function getUserData() {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.GET_USER_DATA, actionTypes.SUCCESS_GET_USER_DATA, actionTypes.ERROR_GET_USER_DATA],
                        payload: {
                            request: {
                                url: '/user',
                                headers: {
                                    Authorization: `${jwt}`
                                }
                            }
                        }
                    }
                )
            }
        )
    }

}

export function getRecordings() {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.GET_RECORDINGS, actionTypes.SUCCESS_GET_RECORDINGS, actionTypes.ERROR_GET_RECORDINGS],
                        payload: {
                            request: {
                                url: '/ui/recordings',
                                headers: {
                                    Authorization: `${jwt}`
                                }
                            }
                        }
                    }
                )
            }
        )
    }

}

export function getIdentities() {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.GET_IDENTITIES, actionTypes.SUCCESS_GET_IDENTITIES, actionTypes.ERROR_GET_IDENTITIES],
                        payload: {
                            request: {
                                url: '/detectintruder',
                                headers: {
                                    Authorization: `${jwt}`
                                }
                            }
                        }
                    }
                )
            }
        )
    }
}

export function getLogs() {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.GET_LOGS, actionTypes.SUCCESS_GET_LOGS, actionTypes.ERROR_GET_LOGS],
                        payload: {
                            request: {
                                url: '/logs',
                                headers: {
                                    Authorization: `${jwt}`
                                }
                            }
                        }
                    }
                )
            }
        )
    }
}