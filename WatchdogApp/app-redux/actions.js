import * as actionTypes from './actionTypes';
import { Auth } from 'aws-amplify'

export function getRecordings() {
    return (dispatch) => {
        Auth.currentSession().then(
            idToken => {
                let jwt = idToken.getIdToken().getJwtToken()
                dispatch(
                    {
                        types: ["GET_RECORDINGS", actionTypes.SUCCESS_GET_RECORDINGS, "ERROR_RECORDINGS_GET"],
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
