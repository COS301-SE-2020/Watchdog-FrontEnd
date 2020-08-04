import * as actionTypes from './actionTypes';
import { Auth } from 'aws-amplify'
import { AddToBucket } from '../../watchdog-frontend/api/api';
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

export function getVideos(component, message) {
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/ui/recordings",{headers: {
        Authorization: `${idToken.jwtToken}`
          
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios(api_route).then((res) => {
            console.log(res)
            //FIXME: Get data properly (right now it is assumed to be in '.data')
            //FIX Lambda then fix data response
            dispatch(loadData(res.data));
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}

export function addIdentity(identity_name,filename,file,component, message) {
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/upload?name="+identity_name+"&filename="+fileName+"&tag=whitelist",
    {   name: identity_name ,
        filename: fileName,
        tag: "whitelist"
    },
    {
        headers: 
        {
            Authorization: `${idToken.jwtToken}`
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios.post(api_route).then(
            async (res) => {
            await AddToBucket(res.data.data.url,file,res.data.data.fields)
            console.log(res)
            //FIX: I dont really know what to do dispatch in a post
            dispatch(loadData(res.data));
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}

export function addToBucket(file,formFields,success,error) {
    const formData = new FormData()
    console.log(file)
    for ( let key in formFields ) {
        formData.append(key, formFields[key])
    }
    
    
    formData.append('file', file.blobFile)
    
    await axios.post(url, formData ).then(success).catch(error)
  
}

export function getIdentities(setUser, component, message) {
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/detectintruder",
    {
        headers: 
        {
        Authorization: `${idToken.jwtToken}`  
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios(api_route).then((res) => {
            let users = res.data.data.identities.whitelist
            let format = users.map((item, index)=>{
            let el ={
                    id : item.index ,
                    name : item.name,
                    img : item.path_in_s3
                    }
                dispatch(loadData(el));
                })
            setUser(format) //This is found in IdentitySettings
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}
export function getLogs(set_func,component, message) {
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/logs",
    {headers: {
        Authorization: `${idToken.jwtToken}`
          
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios(api_route).then((res) => {
            
            set_func(res.data.data.logs) //This should be done in the component
            dispatch(loadData(res.data.data.logs));
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}

export function getSystemState(set_func,component, message) {
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel",
    {headers: {
        Authorization: `${idToken.jwtToken}`
          
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios(api_route).then((res) => {
            var response
            let security_level = res.data.data.preferences.security_level
           
            if(security_level==="0"){
              response= "Disarmed"
            }else if(security_level==="1"){
              response="Recognised"
            }else{
              response="Armed"
            }
            set_func(response)
            
            
            //This should be done in the component
            dispatch(loadData(security_level));
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}

export function updateSystemState(state,prev,component, message) {
    var response
    if(state==="Armed"){
        response=2
    }else if(state==="Recognised"){
        response=1
    }else{
        response=0
    }
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel",
    {
    
        security_level: response 
        
      },
    {
        headers: 
        {
        Authorization: `${idToken.jwtToken}`  
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios.post(api_route).then((res) => {
            
            
            //Not sure to dispatch or not
            dispatch(loadData(security_level));
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}

export function getNotificationSettings(set_func,component, message) {
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences",
    {headers: {
        Authorization: `${idToken.jwtToken}`
          
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios(api_route).then((res) => {
            let notification = res.data.data.preferences.notifications
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
            set_func(set) //This should be done in the component
            dispatch(loadData(set));
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}

export function updateNotifications(body,set_func,component, message) {
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
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/notifications",
    {
    
        security_company: body.security,
        type: not_type,
        value: not_value
      
    },
    {
        headers: {
        Authorization: `${idToken.jwtToken}`
          
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios.post(api_route).then(
            async (res) => {
                let set ={
                    type : body.type,
                    email : body.email,
                    number : body.number,
                    security : body.security
                  }
            set_func(set) //This should be done in the component
            dispatch(loadData(set)); //Need to do an Alert here
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}

export function deleteIdentity(id,component, message) {
    let {idToken} = await Auth.currentSession()
    api_route="https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities?index="+id,
    {headers: {
        Authorization: `${idToken.jwtToken}`
          
        }
      }
    //Start Loading process
    dispatch(startLoading(component, message));
    return (dispatch, getState) => {
        //Make call and then terminate loading process
        return axios.delete(api_route).then((res) => {
            
            
            dispatch(loadData(res.data.data.logs)); //Not sure if we need to dispatch
            dispatch(doneLoading(component, true, "Load Completed Successfully"));
            return Promise.resolve();
        }).catch((error) => {
            //TODO: Better error messages 'rr, Not sure whether to dispatch
            dispatch(doneLoading(component, false, `There seems to be an error. Error: ${error}`));
        });
    }
}
