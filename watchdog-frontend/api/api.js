import axios from 'axios'
import { Auth } from 'aws-amplify'
import { Radio, RadioGroup, Panel, Alert } from 'rsuite'
import IdentityNotification from '../components/IdentityNotification'

async function getVideos(callback, errorcallback) {
  let url = await "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/ui/recordings"
  let { idToken } = await Auth.currentSession()
  console.log(idToken)
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

async function getLiveList(set_func) {
  let url = await "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/controlpanel"
  let { idToken } = await Auth.currentSession()
  let userId = idToken.payload.sub

  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`

    }
  })
    .then(res => {
      //do something
      res.userId = userId
      set_func(res)
    })
    .catch(err => {
      // catch error

    })

}

async function addIdentity(identity_name, fileName, file, success_callback, error_callback) {
  let url = await "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/upload?name=" + identity_name + "&filename=" + fileName + "&tag=whitelist"
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
  //console.log(file)
  for (let key in formFields) {
    formData.append(key, formFields[key])
  }


  formData.append('file', file.blobFile)

  await axios.post(url, formData).then(success_callback).catch(error_callback)



}

async function getIdentities(setUser) {
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/detectintruder"

  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`



    }
  })
    .then(res => {
      console.log(res)
      let users = res.data.data.identities.whitelist
      let format = users.map((item, index) => {
        let el = {
          id: item.index,
          name: item.name,
          img: item.path_in_s3,
          monitor : item.monitor,
          img_key : item.key
        }
        return el
      })
      setUser(format)
      //console.log(users)

    })
    .catch(err => {
      // catch error

    })

}
async function getLogs(set_func) {
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/logs"

  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`


    }
  })
    .then(res => {
      let logs = res.data.data.logs
      //do something
      //console.log(logs)

      set_func(logs)

    })
    .catch(err => {
      // catch error

    })
}

async function getSystemState(set_func) {
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel"

  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`


    }
  })
    .then(res => {
      //do something
      // console.log(res)
      var response
      let security_level = res.data.data.preferences.security_level
      // console.log(security_level)
      if (security_level === "0") {
        response = "Disarmed"
      } else if (security_level === "1") {
        response = "Recognised"
      } else {
        response = "Armed"
      }
      set_func(response)

    })
    .catch(err => {
      // catch error

    })
  // set_func("Armed")
}

async function updateSystemState(state, prev, error_callback) {
  var response
  if (state === "Armed") {
    response = 2
  } else if (state === "Recognised") {
    response = 1
  } else {
    response = 0
  }
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel"
  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.post(url, {

    security_level: response

  },
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(
      async (res) => {
        //console.log(res)

        //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(
        res => {
          //console.log(res)
          error_callback(prev)
          Alert.error("Unable to change system state at the moment, please try again later.")
        }
      )
}

async function getNotificationSettings(body, set_func) {
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences"

  let { idToken } = await Auth.currentSession()
  //console.log(idToken)
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`


    }
  })
    .then(res => {
      //do something
      let notification = res.data.data.preferences.notifications
      //console.log(notification)
      // let format = notification.map((item, index)=>{
      //   let el ={
      //     type : item.type,
      //     value : item.value,
      //     security : item.security_company
      //   }
      //   // console.log(el)
      //   return el

      // })
      // console.log(format)
      // {security_company: "", type: "email", value: "jonathensundy@gmail.com"}
      let sec = notification.security_company
      let Type = "Push Notifications"
      let Email = ""
      let NumberSms = ""
      if (notification.type === "email") {
        Type = "Email"
        Email = notification.value
      }
      if (notification.type === "sms") {
        Type = "SMS"
        NumberSms = notification.value
      }
      let set = {
        type: Type,
        security: sec,
        email: Email,
        number: NumberSms
      }
      set_func(set)
      // console.log(format)
      // console.log(res.data.data.preferences.notifications)

    })
    .catch(err => {
      // catch error

    })


  // let set ={
  //   type : "Email",
  //   email : "email@me.com",
  //   security : "0740234565"
  // }

  // set_func(set)
}

async function updateNotification(body, set_func) {
  let { idToken } = await Auth.currentSession()
  let not_type = "push"
  let not_value = ""

  if (body.type === "Email") {
    not_type = "email"

  }
  if (body.type === "SMS") {
    not_type = "sms"


  }
  
  if(!body.security)
	body.security = ""
	
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/notifications?type="+not_type+"&security_company="+body.security
  await axios.post(url, {},
    {

      headers: {
        Authorization: `${idToken.jwtToken}`

      }
    }).then(
      async (res) => {
        //console.log(res)
        let set = {
          type: body.type,
          security: body.security
        }
        Alert.success("Notification settings updated", 3000)
        set_func(set)

        //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(
        res => {
          //console.log(res)

          Alert.error("Unable to change notification settings at the moment, please try again later.", 3000)
        }
      )



}

async function deleteIdentity(id, succ, err) {
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities?index=" + id
  let { idToken } = await Auth.currentSession()
  axios.delete(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`
    }
  }).then(succ).catch(err);

}

async function getDetected(succ, err) {
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage'
  let { idToken } = await Auth.currentSession()
  await axios.get(url, {
    headers: {
      Authorization: `${idToken.jwtToken}`


    }
  }).then(res => succ(res.data.data.frames)).catch(err)



}

async function addToWhitelist(succ, err, name, key) {
  let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage?name='+name+"&key=" + key
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
    }).then(succ).catch(err)

}

async function updateIdentityNotification(key, message, watch, succ, err){
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

export { getLiveList, getLogs, updateNotification, getVideos, addIdentity, AddToBucket, getIdentities, getSystemState, updateSystemState, getNotificationSettings, deleteIdentity, getDetected, addToWhitelist, updateIdentityNotification }
