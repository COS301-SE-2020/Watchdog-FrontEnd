import axios from 'axios'
import { Auth } from 'aws-amplify'
import {Radio, RadioGroup, Panel, Alert} from 'rsuite'

async function getVideos( callback, errorcallback){
    let url = await "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/ui/recordings"
    let {idToken} = await Auth.currentSession()
    console.log(idToken)
     await axios.get(url, { 
      headers: {
      Authorization: `${idToken.jwtToken}`
        
      }
    })
    .then(res => {
      //do something
      if(callback != null){
         callback(res);
      }
    })
    .catch(err => {
      // catch error
      if(errorcallback != null){
         errorcallback(err);
      }
    })

}

async function addIdentity(identity_name,fileName, setUrl,file, updatelist){
  let url = await "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/upload?name="+identity_name+"&filename="+fileName+"&tag=whitelist"
  let {idToken} = await Auth.currentSession()
  
  await axios.post(url,{
    
    name: identity_name ,
    filename: fileName,
    tag: "whitelist"
    
  }, 
  {

    headers: {
      Authorization: `${idToken.jwtToken}`
        
      }
  }).then(
      async (res) => {console.log(res)
               await AddToBucket(res.data.data.url,file,res.data.data.fields)
               //updatelist()
              //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(
    res => console.log(res)
  )

}

async function AddToBucket(url, file, formFields){
  const formData = new FormData()
  console.log(file)
  for ( let key in formFields ) {
      formData.append(key, formFields[key])
  }
  
  
  formData.append('file', file.blobFile)
  
  await axios.post(url, formData ).then(res=>console.log(res)).catch(res=>console.log(res))


// const config = {
//   onUploadProgress: function(progressEvent) { 
//       var percentCompleted = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total
//       );
//       console.log(percentCompleted);
//   },
//   headers: {
//     "Content-Type": "image/*"
//   },
//   params: {
//     ...formFields
//   }
// };

// console.log({"CONFIG": config});

// axios.post(url, file, config)
//  .then(async res => {
//       callback({res, key})
//   })
//   .catch(err => {
//       console.log(err);
//   })

}

async function getIdentities(setUser){
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/detectintruder"

  let {idToken} = await Auth.currentSession()
    console.log(idToken)
     await axios.get(url, { 
      headers: {
      Authorization: `${idToken.jwtToken}`

      
        
      }
    })
    .then(res => {
      //do something
      let users = res.data.data.identities.whitelist
      let format = users.map((item, index)=>{
        let el ={
          id : index +1 ,
          name : item.name,
          img : item.path_in_s3
        }
        return el
      })
      setUser(format)
      console.log(res.data.data.identities.whitelist)
      
    })
    .catch(err => {
      // catch error
      
    })

}
async function getLogs(set_func){
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/logs"

  let {idToken} = await Auth.currentSession()
    console.log(idToken)
     await axios.get(url, { 
      headers: {
      Authorization: `${idToken.jwtToken}`
      
        
      }
    })
    .then(res => {
      let logs = res.data.data.logs
      //do something
      console.log(logs)
      
      set_func(logs)
      
    })
    .catch(err => {
      // catch error
      
    })
}

async function getSystemState(set_func){
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel"

  let {idToken} = await Auth.currentSession()
    console.log(idToken)
     await axios.get(url, { 
      headers: {
      Authorization: `${idToken.jwtToken}`
      
        
      }
    })
    .then(res => {
      //do something
      console.log(res)
      var response
      let security_level = res.data.data.preferences.security_level
      console.log(security_level)
      if(security_level==="0"){
        response= "Disarmed"
      }else if(security_level==="1"){
        response="Recognised"
      }else{
        response="Armed"
      }
      set_func(response)
      
    })
    .catch(err => {
      // catch error
      
    })
  // set_func("Armed")
}

async function updateSystemState(state,prev, error_callback){
  var response
  if(state==="Armed"){
    response=2
  }else if(state==="Recognised"){
    response=1
  }else{
    response=0
  }
  let url="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel"
  let {idToken} = await Auth.currentSession()
    console.log(idToken)
  await axios.post(url,{
    
    security_level: response 
    
  }, 
  {

    headers: {
      Authorization: `${idToken.jwtToken}`
        
      }
  }).then(
      async (res) => {console.log(res)
               
              //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(
    res => {console.log(res)
    error_callback(prev)
    Alert.error("Unable to change system state at the moment, please try again later.")
                      }
  )
}

async function getNotificationSettings(body, set_func){
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences"

  let {idToken} = await Auth.currentSession()
    console.log(idToken)
     await axios.get(url, { 
      headers: {
      Authorization: `${idToken.jwtToken}`
      
        
      }
    })
    .then(res => {
      //do something
      let notification = res.data.data.preferences.notifications
      console.log(notification)
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
      if(notification.type==="email") {
        Type = "Email"
        Email = notification.value
      }
      if(notification.type==="sms") {
        Type = "SMS"
        NumberSms = notification.value
      }
      let set ={
        type : Type,
        security : sec,
        email : Email,
        number : NumberSms
      }
      set_func(set)
      // console.log(format)
      console.log(res.data.data.preferences.notifications)
      
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

async function updateNotification(body, set_func){
  let {idToken} = await Auth.currentSession()
  let not_type = "push"
  let not_value = ""

  if(body.type==="Email"){
    not_type = "email"
    not_value = body.email
  }
  if(body.type==="SMS"){
    not_type = "sms"
    not_value = body.number
    
  }
  let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/notifications"
  await axios.post(url,{
    
      security_company: body.security,
      type: not_type,
      value: not_value
    
  }, 
  {

    headers: {
      Authorization: `${idToken.jwtToken}`
        
      }
  }).then(
      async (res) => {console.log(res)
        let set ={
          type : body.type,
          email : body.email,
          number : body.number,
          security : body.security
        }
        Alert.success("Notification settings updated", 3000)
        set_func(set)
               
              //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(
    res => {console.log(res)
    
    Alert.error("Unable to change notification settings at the moment, please try again later.", 3000)
                      }
  )

  

}

export {getLogs,updateNotification, getVideos, addIdentity, AddToBucket, getIdentities, getSystemState, updateSystemState, getNotificationSettings}
