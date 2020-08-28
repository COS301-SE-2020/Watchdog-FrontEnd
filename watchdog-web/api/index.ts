import axios from 'axios'
import { Auth } from 'aws-amplify'

export async function getDetected(succ: Function, err : Function) {
    let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage'
    let { idToken } = await Auth.currentSession()
    await axios.get(url, {
        headers: {
            Authorization: `${idToken.jwtToken}`


        }
    }).then(res => succ(res.data.data.frames)).catch(err)



}
