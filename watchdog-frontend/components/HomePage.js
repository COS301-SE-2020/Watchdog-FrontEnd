import React, { Component } from 'react'
import {FlexboxGrid,SelectPicker,Button,Alert,Panel, IconButton,Table,Icon, Grid, Row,Avatar,Col,Modal,Popover,Whisper} from 'rsuite'
// import Col from 'rsuite/lib/Carousel';
import CameraStatusTable from './CameraStatusTable'
import SystemState from './SystemState'
import Log from './HomePageLogs'
import  { Auth } from 'aws-amplify'
const { Column, HeaderCell, Cell, Pagination } = Table;

const states=[ {
    "label": "Armed",
    "value": "Armed"
  },
  {
    "label": "Recognised Only",
    "value": "Recognised Only"
  },
  {
    "label": "Disarmed",
    "value": "Disarmed"
  }]
  const cameras=[
    {
        "cam_id": "1",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Yard",
        "status": "online"
        },
        {
        "cam_id": "2",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status": "offline"
        },
        {
        "cam_id": "3",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status":"online"
        },
        {
        "cam_id": "4",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status":"online"
        }
        ,
        {
        "cam_id": "4",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status":"online"
        },
        {
        "cam_id": "4",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status":"online"
        }
  ]
class HomePage extends Component{
    constructor(){
        super();
        this.state ={
           value:null,
           show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
    handleChange(value){
        if(value=="Disarmed"){
            this.setState({
                value
              });
            return(Alert.warning('Notifications switched off for all movements',3000))
            
     }   else if(value=='Recognised Only'){
        this.setState({
            value
          });
             return(Alert.warning('Intruders will now be detected, Add Recognised Personel in Profile page',3000))
     } else{
        this.setState({
            value
          });
         return(Alert.success('Armed Successfully, Notifications switched on for all movement',3000))
     }
        
         
    }
    checkStatus(value){
        if(value=="online"){
            return(<IconButton icon={<Icon icon="check-circle" />} circle size="lg"/>)
        }else{
            return(<IconButton icon={<Icon icon="off" />} circle size="lg"/>)
        }
    }
    


    handleLogout(){
      this.props.handleChange(1)
      Auth.signOut();

    }
 
    render(){
        const items = []
        return(
          <Grid fluid> 
            <Row fluid>
              <Col xs={12}>                  
                  <SystemState />   
                  <Row>
                    <Col md={12} sm={12}>
                      <Panel header={<div style={{textAlign: 'center'}} >Live Stream</div>} shaded>
                        <div style={{textAlign: 'center'}} >
                          <IconButton onClick={()=>{this.props.handleChange(2)}} icon={<Icon icon="video-camera" />} size="lg" />
                        </div>
                      </Panel> 
                    </Col>  
                    <Col md={12} sm={12}>
                      <Panel  header={<div style={{textAlign: 'center'}} >Recordings</div>} shaded>
                        <div style={{textAlign: 'center'}} >
                          <IconButton onClick={()=>{this.props.handleChange(3)}}  icon={<Icon icon="logo-video" />} size="lg" />
                        </div>
                      </Panel>  
                    </Col>
                  </Row> 
                  <Row>
                    <Col md={12} sm={12}>
                      <Panel  header={<div style={{textAlign: 'center'}} >Settings</div>} shaded>
                        <div style={{textAlign: 'center'}} >
                          <IconButton onClick={()=>{this.props.handleChange(4)}} icon={<Icon icon="cog" />} size="lg" />  
                        </div>
                      </Panel>  
                    </Col>  
                    <Col md={12} sm={12}>
                        <Panel  header={<div style={{textAlign: 'center'}} >Logout</div>} shaded>
                        <div style={{textAlign: 'center'}} >
                          <IconButton onClick={this.handleLogout} icon={<Icon icon="sign-out" />} size="lg" />
                        </div>
                      </Panel>
                    </Col>
                  </Row>     
              </Col>
              <Col xs={12}>
                  <CameraStatusTable />
                  
              </Col>
            </Row>
            <Row fluid>
              
              
              <Col  xs={24}>
                 
                  <Log />
              </Col>
            </Row>
          </Grid>
          
        //     <div>
        //         {/* <div className='HomeDiv'>This is my div</div> */}
            
        //     <div className="show--grid">
        //       <CameraStatusTable />
        //     <FlexboxGrid justify="space-around">
               
        //     <FlexboxGrid.Item className='show-grid' colspan={4} >
        //         <Grid>
        //             <Row>
        //                 <Col style={{textAlign: "center"}} md={6}>
        //     <h3>Notifications</h3>
        //     <div  style={{ lineHeight: 3 }}>The current state is: {this.state.value}</div>
        //     <SelectPicker
        //     size="lg"
        //     appearance="default"
        //     placeholder={this.state.value}
        //     searchable={false}
        //     value={this.state.value}
        //     onChange={this.handleChange}
        //     data={states}
        //     block
        //     />
        //     </Col>
        //     </Row>
        //     <Row style={{height:25}}></Row>
        //     <Row>
        //     <Col style={{textAlign: "center"}} md={6}><h3>Camera Log</h3></Col>
        //     </Row>
        //     <Row>
        //     <Col style={{textAlign: "center"}} md={6}>
        //    <div className="modal-container">
        //   <Button block appearance="primary" onClick={this.open}> Open</Button>
       

        // <Modal show={this.state.show} onHide={this.close}>
        //   <Modal.Header>
        //     <Modal.Title>Modal Title</Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        
        //   </Modal.Body>
        //   <Modal.Footer>
        //     <Button onClick={this.close} appearance="primary">
        //       Ok
        //     </Button>
        //     <Button onClick={this.close} appearance="subtle">
        //       Cancel
        //     </Button>
        //   </Modal.Footer>
        // </Modal>
        // </div>
        // </Col>
        // </Row>
        // </Grid>
      
        //     </FlexboxGrid.Item>
            
        //     <FlexboxGrid.Item colspan={12}>
        //     <Grid>
        //         <Row> <Col md={18} style={{textAlign: "center"}}><h3>Camera Status</h3></Col></Row>
        //         <Row>
        //             <Col style={{textAlign: "center"}} md={6}><h4>ID</h4></Col>
        //             <Col style={{textAlign: "center"}} md={6}><h4>Location</h4></Col>
        //             <Col style={{textAlign: "center"}} md={6}><h4>Status</h4></Col>
        //         </Row>
        //         {items}
        //     </Grid>
        //     </FlexboxGrid.Item>
        //     </FlexboxGrid>
        //     </div>
        //     <div>
        //         <Grid className="homeGrid" fluid>
                    
        //             <Row md={2} fluid>
        //                 <Col style={{textAlign: "center"}} md={8}>
        //                     <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 300 }}>
        //                     <Icon icon={"video-camera"} style={{fontSize:200}} />
        //                     <Panel style={{textAlign: "center"}} header="Live Video">
        //                         <Whisper placement="top" trigger="hover" speaker={<Popover style={{textAlign: "center"}} title="Live Videos">
        //                                                                         <p>Discover all the Live Video being transmitted by your
        //                                                                             Cameras now! </p>
        //                                                                         </Popover>}>
        //                         <Button>Go To Live Videos</Button>
        //                         </Whisper>
        //                     </Panel>
        //                     </Panel>
        //                 </Col>
        //                 <Col style={{textAlign: "center"}} md={8}>
        //                     <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 300 }}>
        //                     <Icon icon={"logo-video"} style={{fontSize:200}} />
        //                     <Panel style={{textAlign: "center"}} style={{textAlign: "center"}} header="Recordings">
        //                     <Whisper placement="top" trigger="hover" speaker={<Popover style={{textAlign: "center"}} title="Recordings">
        //                                                                         <p>Discover all Recorded Videos from different locations
        //                                                                             in your home! </p>
        //                                                                         </Popover>}>
        //                         <Button>Go To Recordings</Button>
        //                         </Whisper>
        //                     </Panel>
        //                     </Panel>
        //                 </Col>
        //                 <Col style={{textAlign: "center"}} md={8}>
        //                     <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 300 }}>
        //                     <Icon icon={"gear"} style={{fontSize:200}} />
        //                     <Panel style={{textAlign: "center"}} header="Settings">
        //                     <Whisper placement="top" trigger="hover" speaker={<Popover style={{textAlign: "center"}} title="Settings">
        //                                                                         <p>Add Training data and much more in the 
        //                                                                             Settings Page! </p>
        //                                                                         </Popover>}>
        //                         <Button>Go To Settings</Button>
        //                         </Whisper>
        //                     </Panel>
        //                     </Panel>
        //                 </Col>
        //             </Row>
        //         </Grid>
        //     </div>
        //     </div>

        )
    }
}
export default HomePage