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

async function addIdentity(identity_name,fileName, setUrl,file, updatelist){
  let url = await "https://aprebrte8g.execute-api.af-south-1.amazonaws.com/testing/identities/upload?name="+identity_name+"&filename="+fileName+"&tag=whitelist"
  let {idToken} = await Auth.currentSession()
  let newName = fileName.replace(/ /g, '')
  newName = newName.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
  console.log(newName)
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
               await AddToBucket(res.data.data.url ,file,res.data.data.fields)
               updatelist()
              //setUrl(res.data.data.url, res.data.data.fields)
      }).catch(
    res => console.log(res)
  )

}

async function AddToBucket(url, file, formFields){
  console.log(file)
  const formData = new FormData()
  for ( let key in formFields ) {
    formData.append(key, formFields[key]);
}
  

  formData.append('file', file)

  await axios.post(url, formData).then(res=>console.log(res)).catch(res=>console.log(res))


}

async function getIdentities(setUser){
  let url = "https://aprebrte8g.execute-api.af-south-1.amazonaws.com/testing/detectintruder"

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

export {getVideos, addIdentity, AddToBucket, getIdentities}
