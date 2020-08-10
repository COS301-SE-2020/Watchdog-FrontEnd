import React, { Component } from 'react'
import {IconButton,Icon,Modal,Button, Grid,Row,Col}  from 'rsuite'
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import {getLiveList} from '../api/api'
import Loading from './Loading'
import socketIOClient from "socket.io-client";
import { Auth} from 'aws-amplify'
const ENDPOINT = "ec2-13-245-35-130.af-south-1.compute.amazonaws.com:8080";
var base64
var socket;


// Get child nodes

class SocketClient extends Component {
  
  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.myRef.current))
  }
  ref = img => {
    this.img = img
  }
  constructor(){
      super()
      this.myRef = React.createRef();
      this.state = {
        data: []
       
      };
     this.setData=this.setData.bind(this) 
     socket = socketIOClient(ENDPOINT);
  }
  
 
  setData(img){
    img = img.substring(2,img.length-1)
    this.setState({data:img})
  }
 
  componentDidMount() {
    

    socket.emit("authorize", { "user_id" : this.props.user, "client_type" : "consumer", "client_key" : "string" });
    socket.emit("consume-view", { "camera_list" : [this.props.data.camera_id],"producer_id": this.props.data.site });
    socket.on("consume-frame", (message) => this.setData(message.frame));
    // this.setData()
   
  }
  componentWillUnmount(){
    socket.disconnect()
  }
  

render(){
  
  return(
    <div>
      <div >
    <img ref={this.myRef} src={"data:image/jpeg;base64," + this.state.data} />
    </div>
    <div>
    <Row fluid>
    <Col fluid xs={24}>
    <IconButton onClick={this.handleClickFullscreen} icon={<Icon icon="arrows-alt" />} circle size="lg" />
    </Col>
    </Row>
    </div>
    </div>
    )
  }
}


export default SocketClient;
