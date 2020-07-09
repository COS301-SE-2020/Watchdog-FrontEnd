import axios from 'axios'

function getVideos(config, callback, errorcallback){
    let url = "https://aprebrte8g.execute-api.af-south-1.amazonaws.com/testing/`storage/video`"
    axios.get(url, config)
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

export {getVideos}
