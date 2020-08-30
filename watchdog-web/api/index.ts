import axios from 'axios'
import { Auth } from 'aws-amplify'

export async function getDetected(succ: Function, err: Function) {
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage'
  let { idToken } = await Auth.currentSession()
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`


    }
  }).then(res => succ(res.data.data.frames)).catch(() => err())

}

export async function addToWhitelist(succ: Function, err: Function, name: string, key: string) {
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage?name=' + name + "&key=" + key
  let { idToken } = await Auth.currentSession()

  await axios.post(url,
    {
      name,
      key
    },
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then((res)=>succ(res)).catch(err)

}

export async function getIdentities(succ: Function, err: Function) {
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/detectintruder"

  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`



    }
  }).then(succ).catch(err)

}
