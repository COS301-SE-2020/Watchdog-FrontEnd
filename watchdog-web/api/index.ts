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
  }).then((res)=>{
    console.log(res)
    succ(res)
  }).catch((error)=>{
    console.log(error)
    err()})

}

export async function deleteIdentity(id: number, succ: Function, err: Function) {
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities?index=" + id
  let { idToken } = await Auth.currentSession()
  axios.delete(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`
    }
  }).then(succ).catch(err);

}

export async function addIdentity(identity_name: string, fileName: string, file: any, success_callback : Function, error_callback: Function) {
  let url =  "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/upload?name=" + identity_name + "&filename=" + fileName + "&tag=whitelist"
  let { idToken } = await Auth.currentSession()

  await axios.post(url, {

    name: identity_name,
    filename: fileName,
    tag: "whitelist"

  },
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(
      async (res) => {
        //console.log(res)
        await AddToBucket(res.data.data.url, file, res.data.data.fields, success_callback, error_callback)

        //updatelist()
        //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(error_callback)

}

async function AddToBucket(url, file, formFields, success_callback, error_callback) {
  const formData = new FormData()
  for (let key in formFields) {
    formData.append(key, formFields[key])
  }


  formData.append('file', file)
  console.log(file)

  await axios.post(url, formData).then(success_callback).catch(error_callback)
}


export async function getNotificationSettings(succ : Function, err: Function){
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences"

  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`


    }
  }).then(res=>succ(res.data.data.preferences.notifications)).catch(res=>console.log(res))

} 

export async function updateNotification(security_company: string, not_type: string , succ : Function, err : Function) {
  let { idToken } = await Auth.currentSession()
  
	
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/notifications?type="+not_type+"&security_company="+security_company
  await axios.post(url, {},
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(succ).catch(err)



}

export async function updateIdentityNotification(key, message, watch, succ, err){
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/watchlist?message='+message+"&key=" + key + "&watch="+watch
  let { idToken } = await Auth.currentSession()

  await axios.post(url, 
    {
      message, 
      key,
      watch
    },
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(succ).catch(err)

}

export async function getProfileAnalytics(scale , succ, err){
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/analytics/profile?end_date='+Math.abs(Date.now())/1000+'&time_scale='+scale
  let { idToken } = await Auth.currentSession()
  
  await axios.get(url,
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(succ).catch(err)

}

export async function getDashBoardAnalytics(succ, err){
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/analytics/dashboard?end_date='+Math.abs(Date.now())/1000
  let { idToken } = await Auth.currentSession()
  
  await axios.get(url,
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(succ).catch(err)

}

export async function sendVerification(succ, err){
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/notifications/verify'
  let { idToken } = await Auth.currentSession()
  
  await axios.post(url,{},
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(succ).catch(err)

}

export async function getVideos(callback, errorcallback) {
  let url = await "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/ui/recordings"
  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`

    }
  })
    .then(res => {
      //do something
      if (callback != null) {
        callback(res);
      }
    })
    .catch(err => {
      // catch error
      if (errorcallback != null) {
        errorcallback(err);
      }
    })

}



