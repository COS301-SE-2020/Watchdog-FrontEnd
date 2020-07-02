import React, { Component } from 'react'
import {Row,Col,Panel, Grid}  from 'rsuite'

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
            <Col xs={6}>
                <Panel  bordered header={<h2>{value.cam_location}</h2>}>
                  <div>{<h4>Camera ID: {value.cam_id}</h4>}</div>
                          <video style={{"width":"100%"}}  controls >
                            <source src={value.cam_url} type="video/mp4"/>
                          </video>
                </Panel>
            </Col>
          ) 
        }  
         
    )
          return(
            <Grid fluid>
              <Row fluid>
                {items}
              </Row>
            </Grid>
          )
      }
  }
   
export default LiveVideo