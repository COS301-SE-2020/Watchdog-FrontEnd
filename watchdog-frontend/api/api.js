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

async function addIdentity(identity_name,fileName, setUrl,file){
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
      (res) => {console.log(res)
              AddToBucket(res.data.data.url ,file,res.data.data.fields)

              //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(
    res => console.log(res)
  )

}

async function AddToBucket(url, file, formFields){
  console.log(formFields)
  const formData = new FormData()
  for ( let key in formFields ) {
    formData.append(key, formFields[key]);
}
  //formData.append(formFields)
  // formData.append('AWSAccessKeyId', formFields.AWSAccessKeyId)
  // formData.append('key', formFields.key)
  // formData.append('signature', formFields.signature)
  // formData.append('policy', formFields.policy)
  //formData.append('x-amz-meta-key', formFields.x-amz-meta-key)
  // formData.append('x-amz-meta-name',formFields.x-amz-meta-name)
  // formData.append('x-amz-meta-tag', formFields.x-amz-meta-tag)
  // formData.append('x-amz-meta-uuid', formFields.x-amz-meta-uuid)

  // formData.append('x-amz-security-token', formFields.x-amz-security-token)

  formData.append('file', file)

  await axios.post(url, formData).then(res=>console.log(res)).catch(res=>console.log(res))


}

export {getVideos, addIdentity, AddToBucket}
