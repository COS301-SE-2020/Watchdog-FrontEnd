import React, { Component } from 'react'
import {Row,Col,Panel}  from 'rsuite'

const elements=[
    {
    "cam_id": "1",
    "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
    "cam_location": "Yard",
    },
    {
    "cam_id": "2",
    "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
    "cam_location": "Kitchen"
    },
    {
    "cam_id": "3",
    "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
    "cam_location": "Kitchen"
    },
    {
    "cam_id": "4",
    "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
    "cam_location": "Kitchen"
    }
]

  
  class LiveVideo extends Component {
    constructor(){
        super()
        this.canvasRef = React.createRef();
    }
    
      render(){
        const items = []
            const videoData=elements.map((value)=>{
          items.push(
            <Col md={6} sm={10}>
                <Panel width="450" bordered header={<h2>{value.cam_location}</h2>}>
          <div>{<h4>Camera ID: {value.cam_id}</h4>}</div>
                    <div><video width="400" height="400" controls >
      <source src={value.cam_url} type="video/mp4"/>
     </video></div>
                </Panel>
            </Col>
          ) 
        }  
         
    )
          return(
            <Row>
            {items}
          </Row>
          )
      }
  }
   
export default LiveVideo