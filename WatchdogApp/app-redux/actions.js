import * as actionTypes from './actionTypes';
import { Auth } from 'aws-amplify'
import axios from 'axios'

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
                console.log(jwt)
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

export function uploadIdentity(name, filename, file) {
    return (dispatch, getState) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                Promise.all([
                    dispatch(
                        {
                            types: [actionTypes.GET_IDENTITIES_UPLOAD, actionTypes.GET_IDENTITIES_UPLOAD_SUCCESS, actionTypes.GET_IDENTITIES_UPLOAD_FAIL],
                            payload: {
                                request: {
                                    method: 'post',
                                    url: '/identities/upload',
                                    headers: {
                                        Authorization: `${jwt}`
                                    },
                                    params: {
                                        name,
                                        filename,
                                        tag: 'whitelist'
                                    }
                                }
                            }
                        }
                    )
                ]).then(res => {
                    // console.log(getState().UI.Identities.uploadData);
                    const whitelist_upload_queue = { ...getState().UI.Identities.uploadData }
                    console.log({ "WHITELSIT": whitelist_upload_queue });
                    const fields = whitelist_upload_queue.fields
                    const url = whitelist_upload_queue.url

                    const formData = new FormData()
                    for (let key in fields) {
                        formData.append(key, fields[key])
                    }
                    const type = 'image'
                    formData.append('file', { uri: file, name: filename, type })

                    dispatch(
                        {
                            types: [actionTypes.UPLOAD_TO_S3, actionTypes.UPLOAD_TO_S3_SUCCESS, actionTypes.UPLOAD_TO_S3_FAIL],
                            payload: {
                                request: {
                                    client: 'generic',
                                    method: 'post',
                                    url: url,
                                    data: formData
                                }
                            }
                        }
                    )
                }).catch((error) => {
                    dispatch(
                        {
                            type: actionTypes.UPLOAD_TO_S3_FAIL,
                            error
                        }
                    )
                })


                //wait for state update
                // while(getState().Data.identities.whitelist_upload_queue[0] === 'undefined' || getState().UI.Identities.uploading == true) {}

                // const whitelist_upload_queue = getState().Data.identities.whitelist_upload_queue
                // const formData = new FormData()

                // console.log({"YELLO": whitelist_upload_queue[0]});

                // for (let key in whitelist_upload_queue[0].fields) {
                //     formData.append(key, whitelist_upload_queue[0].fields[key])
                // }

                // const type = 'image'

                // formData.append('file', { uri: file, name: filename, type })
                // axios.post(whitelist_upload_queue[0].url, formData).then(() => {
                //     dispatch(
                //         {
                //             type: actionTypes.UPLOAD_TO_S3_SUCCESS
                //         }
                //     )
                // }).catch((error) => {
                //     dispatch(
                //         {
                //             type: actionTypes.UPLOAD_TO_S3_FAIL,
                //             message: "POST failed",
                //             error: error,
                //             data: whitelist_upload_queue[0],
                //             uri: file,
                //             formData
                //         }
                //     )
                // })
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