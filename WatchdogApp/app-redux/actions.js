import * as actionTypes from './actionTypes';
import { Auth } from 'aws-amplify'

export function getUserData() {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.GET_USER_DATA, actionTypes.GET_USER_DATA_SUCCESS, actionTypes.GET_USER_DATA_FAIL],
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

export function getSecurityLevel() {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.GET_SECURITYLEVEL, actionTypes.GET_SECURITYLEVEL_SUCCESS, actionTypes.GET_SECURITYLEVEL_FAIL],
                        payload: {
                            request: {
                                url: '/preferences/securitylevel',
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

export function updateSecurityLevel(security_level) {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.UPDATE_SECURITYLEVEL, actionTypes.UPDATE_SECURITYLEVEL_SUCCESS, actionTypes.UPDATE_SECURITYLEVEL_FAIL],
                        payload: {
                            request: {
                                method: 'post',
                                url: '/preferences/securitylevel',
                                headers: {
                                    Authorization: `${jwt}`
                                },
                                data: {
                                    security_level
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
                        types: [actionTypes.GET_RECORDINGS, actionTypes.GET_RECORDINGS_SUCCESS, actionTypes.GET_RECORDINGS_FAIL],
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
                        types: [actionTypes.GET_IDENTITIES, actionTypes.GET_IDENTITIES_SUCCESS, actionTypes.GET_IDENTITIES_FAIL],
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

export function getIdentityUploadLink(name, filename) {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: [actionTypes.GET_IDENTITIES_UPLOAD, actionTypes.GET_IDENTITIES_UPLOAD_SUCCESS, actionTypes.GET_IDENTITIES_UPLOAD_FAIL],
                        payload: {
                            request: {
                                method: 'post',
                                url: '/detectintruder',
                                headers: {
                                    Authorization: `${jwt}`
                                },
                                data: {
                                    name,
                                    filename,
                                    tag: 'whitelist'
                                }
                            }
                        }
                    }
                )
            }
        )
    }
}

export function uploadToS3(url, file, fields) {
    const formData = new FormData()

    for ( let key in fields ) {
        formData.append(key, fields[key])
    }
    
    formData.append('file', file.blobFile)
    
    return (dispatch) => {
        dispatch(
            {
                types: [actionTypes.UPLOAD_TO_S3, actionTypes.UPLOAD_TO_S3_SUCCESS, actionTypes.UPLOAD_TO_S3_FAIL],
                payload: {
                    request: {
                        method: 'post',
                        url,
                        formData
                    }
                }
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
                        types: [actionTypes.GET_LOGS, actionTypes.GET_LOGS_SUCCESS, actionTypes.GET_LOGS_FAIL],
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