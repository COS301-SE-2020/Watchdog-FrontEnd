import axios from 'axios'
import { Auth } from 'aws-amplify'

async function getVideos( callback, errorcallback){
    let url = await "https://aprebrte8g.execute-api.af-south-1.amazonaws.com/testing/ui/recordings"
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

async function addIdentity(identity_name,fileName, setUrl){
  let url = await "https://aprebrte8g.execute-api.af-south-1.amazonaws.com/testing/identities/upload?name="+identity_name+"&filename="+fileName+"&tag=whitelist"
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
      res => {console.log(res)
         setUrl(res.data.data.url, res.data.data.fields)}
  ).catch(
    res => console.log(res)
  )

}

export {getVideos, addIdentity}
