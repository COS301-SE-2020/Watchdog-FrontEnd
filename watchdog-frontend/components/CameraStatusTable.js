import React, {Component} from 'react'
import {Table, Badge, Panel,Icon,Avatar} from 'rsuite'
const { Column, HeaderCell, Cell, Pagination } = Table;
import socketIOClient from "socket.io-client";
import {getLiveList} from '../api/api'
import Loading from './Loading'
const ENDPOINT = "ec2-13-245-14-169.af-south-1.compute.amazonaws.com:8080";
var DbValues=[];
var SocketValues=[]
var socket
let newVals=[];
// var videos= {"producers":{
//     "s1ef96c22099020c9467dc16368eb900dfbafc614c2b663bcd4e41051f2b4a514":[
//         "c91be10abd48462a5a606df692bdcfbd3ab8860802e70328f79b08232ec638cc1"  //Comment in to test  locally
//     ]
//     }
// }



var userId;
class CameraStatusTable extends Component{
    constructor(){
        super()
        this.state = {
            loaded: false,
            values: [],
            socketVal: [],
            user:""
           
          };
       this.Compare=this.Compare.bind(this)
       this.setData=this.setData.bind(this)

        socket = socketIOClient(ENDPOINT,{secure: false}); //Comment out to test locally
        
    }
   
    componentDidMount(){
        
    // var userId;
        
        getLiveList((status)=>{
            console.log(status)
    userId=status.userId
    console.log(userId)
    var panel = status.data.data.control_panel
    console.log(panel)
    for(let site_id in panel){
      for(let location in panel[site_id]){
        if(location=="metadata")
          continue;

        else{
          for(let camera_id in panel[site_id][location])
        DbValues.push({
          "camera_id": camera_id,
          "site": site_id,
          "location": location,
          "status": <Badge content="offline" style={{ background: '#820124' }} />//<Avatar circle style={{ background: '#820124' }} size="sm"><Icon icon="video-camera" /></Avatar>
        })
       
      }

  }
}
  
  DbValues.userId=userId
  
  this.setState({values: DbValues})
  
  
  socket.emit("authorize", { "user_id" : userId, "client_type" : "consumer", "client_key" : "string" }); //Comment out to test locally
  socket.on("available-views", (message) => this.setData(message) ); //Comment out to test locally
//   this.setState({socketVal:videos}) //comment in to test locally
console.log(this.state.socketVal)
  
        
    }, (err)=>console.log(err))

}
setData(message){
    this.setState({socketVal:message})
    console.log(this.state.socketVal)
    this.Compare(this.state.socketVal)
}

Compare(message){
    console.log(this.state.values)
    let producers= message
    console.log(producers)
        for(let site_id in producers){
            for(let camera_id in producers[site_id]){
                newVals.push({
                    "site": site_id,
                    "camera": producers[site_id][camera_id]
                })
                
        }
    }
    this.setState({loaded: true, socketVal: newVals})
    
    let valuesCopy = this.state.values
    for(var x=0;x<this.state.values.length;x++){
        for(var y=0;y<this.state.socketVal.length;y++){
            if(this.state.values[x].camera_id==this.state.socketVal[y].camera){
                
                valuesCopy[x].status=  <Badge content="online" style={{ background: '#4caf50' }} />//<Avatar circle style={{ background: '#4caf50' }} size="sm"><Icon icon="video-camera" /></Avatar>
            }
        }
    }
    this.setState({values:valuesCopy})
    
}
    componentWillUnmount(){
        DbValues=[]
        newVals=[]
        this.setState({
            values:[],
            socketVal:[]
        })
        socket.disconnect() //Comment out to test locally
    }
    

    render(){
        
        return(
            <Panel header="Camera Status" bordered bodyFill align='center'>
                <Table
                virtualized
                height={340}
                data={this.state.values}
                fluid
                onRowClick={data => {
                console.log(data);
                }}
            >
                
    
                <Column flexGrow={1}>
                <HeaderCell>Location</HeaderCell>
                <Cell dataKey="location" />
                </Column>

                <Column flexGrow={0.5}>
                <HeaderCell>Status</HeaderCell>
                <Cell dataKey="status" />
                </Column>
    
            </Table>
          </Panel>
        )
        
    }

}

export default CameraStatusTable