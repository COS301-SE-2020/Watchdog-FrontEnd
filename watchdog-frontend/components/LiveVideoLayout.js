import React, { Component } from 'react'
import {IconButton,Icon,Modal,Button, Grid,Row,Col, Panel, Badge}  from 'rsuite'
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import {getLiveList} from '../api/api'
import Loading from './Loading'
import socketIOClient from "socket.io-client";
export var socket;
const ENDPOINT = "ec2-13-245-14-169.af-south-1.compute.amazonaws.com:8080";


import SocketClient from './SocketClient';

// var videos= {"producers":{
//     "s1ef96c22099020c9467dc16368eb900dfbafc614c2b663bcd4e41051f2b4a514":[
//         "c91be10abd48462a5a606df692bdcfbd3ab8860802e70328f79b08232ec638cc1"  //Comment in to test  locally
//     ]
//     }
// }
var values=[];
var userId;
var newVals=[];
  class LiveVideo extends Component {
    constructor(){
        super()
        this.state = {
          data: [],
          loaded:false,
          show: false,
          rowData: [],
          socketVal:[]
         
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.setRow=this.setRow.bind(this);
        this.setData=this.setData.bind(this);
        this.Compare=this.Compare.bind(this);
        socket = socketIOClient(ENDPOINT,{secure: false});
        
    }
    close() {
      this.setState({ show: false });
    }
    open() {
      this.setState({ show: true });
    }
    
    
    componentDidMount() {
        
     
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
    values.push({
      "camera_id": camera_id,
      "site": site_id,
      "location": location,
      "status": <Badge content="offline" style={{ background: '#820124' }} />
    })
   
  }

}
}

values.userId=userId
console.log(userId)
this.setState({data: values,loaded: true})


  socket.emit("authorize", { "user_id" : userId, "client_type" : "consumer", "client_key" : "string" }); //Comment out to test locally
  socket.on("available-views", (message) => this.setData(message) ); //Comment out to test locally
  // this.setData(videos) //comment in to test locally
console.log(this.state.socketVal)

    
}, (err)=>console.log(err))
      
  }
  setData(message){
    this.setState({socketVal:message})
    console.log(this.state.socketVal)
    this.Compare(this.state.socketVal)
}

Compare(message){
    console.log(this.state.data)
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
    
    let valuesCopy = this.state.data
    for(var x=0;x<this.state.data.length;x++){
        for(var y=0;y<this.state.socketVal.length;y++){
            if(this.state.data[x].camera_id==this.state.socketVal[y].camera){
                
                valuesCopy[x].status=  <Badge content="online" style={{ background: '#4caf50' }} />//<Avatar circle style={{ background: '#4caf50' }} size="sm"><Icon icon="video-camera" /></Avatar>
            }
        }
    }
    this.setState({values:valuesCopy})
    
}
  componentWillUnmount(){
    values=[]
    newVals=[]
    this.setState({
      data:[],
      socketVal:[]
    })
    socket.disconnect()
  }
  setRow(rowVal){
    this.setState({rowData : rowVal})
  }
 
 
      render(){
        if(this.state.loaded)
          return(
            
            <div >
              <Grid fluid style={{paddingTop:10}}>
              <Panel  header={<h4>Live Streaming</h4>} bordered bodyFill align='center'>
                <Table
                  autoHeight
                  height={700}
                  data={this.state.data}
                  wordWrap
                  
                >
                  <Column flexGrow={1} align="center" fixed >
                    <HeaderCell><h5>Location</h5></HeaderCell>
                    <Cell dataKey="location" />
                  </Column>
                  
                  <Column flexGrow={0.5}>
                        <HeaderCell>Status</HeaderCell>
                        <Cell dataKey="status" />
                  </Column>
                  
                  <Column flexGrow={1} align="center" fixed >
                    <HeaderCell><h5>Play</h5></HeaderCell>

                    <Cell>
                      {row =>{
                        return (
                          <IconButton  onClick={()=>{this.open(),this.setRow(row)}} icon={<Icon icon="play" />}  circle size="md" />
                        );
                      }}
                   </Cell>
                  </Column>
                </Table>
              </Panel>
              </Grid>
              <div className="modal-container">
              <Modal overflow={false} show={this.state.show} onHide={this.close} size='lg' backdrop="static">
                <Modal.Body>
                <Grid fluid>
                <Row fluid>
                <Col fluid xs={24}>
                  <SocketClient user={userId} data={this.state.rowData}/>
                  </Col>
                  </Row>
                  
                  </Grid>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close} appearance="primary">
                    Close
                  </Button>
                  
                </Modal.Footer>
              </Modal>
            </div>
      </div>
    
          )
          return(<Loading />)
      }
  }
   
export default LiveVideo