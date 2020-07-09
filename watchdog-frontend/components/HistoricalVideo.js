import React, { Component } from 'react'
import {Panel, PanelGroup, Grid, Row, Col, DateRangePicker, DatePicker, CheckPicker, InputGroup} from 'rsuite'
import VideoFrameViewer from './VideoFrameViewer'
import Loading from './Loading'
import {getVideos} from '../api/api'
const VideoTypes = [
      {
        "label": "Movement",
        "value": "Movement"
      },
      {
        "label": "Periodic",
        "value": "Periodic"
      },
      {
        "label": "Intruder",
        "value": "Intruder"
      }
]

const CameraLocations = [
      {
        "label": "Kitchen",
        "value": "Kitchen"
      },
      {
        "label": "Bedroom",
        "value": "Bedroom"
      },
      {
        "label": "Yard",
        "value": "Yard"
      }
]
const data = [
    {
      "id": 1,
      "date": "2016-09-23",
      "time": "12:00",
      "type": "Intruder",
      "location": "Yard",
      "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
  
    },
    {
        "id": 1,
        "date": "2016-09-23",
        "time": "12:00",
        "type": "Intruder",
        "location": "Yard",
        "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
    
      },
      {
        "id": 1,
        "date": "2016-09-23",
        "time": "12:00",
        "type": "Intruder",
        "location": "Yard",
        "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
    
      },
      {
        "id": 1,
        "date": "2016-09-23",
        "time": "12:00",
        "type": "Intruder",
        "location": "Yard",
        "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
    
      },
      {
        "id": 1,
        "date": "2016-09-23",
        "time": "12:00",
        "type": "Intruder",
        "location": "Yard",
        "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
    
      },
      {
          "id": 1,
          "date": "2016-09-23",
          "time": "12:00",
          "type": "Intruder",
          "location": "Yard",
          "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
      
        },
        {
          "id": 1,
          "date": "2016-09-23",
          "time": "12:00",
          "type": "Intruder",
          "location": "Yard",
          "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
      
        },
        {
          "id": 1,
          "date": "2016-09-23",
          "time": "12:00",
          "type": "Intruder",
          "location": "Yard",
          "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
      
        },
        {
            "id": 1,
            "date": "2016-09-23",
            "time": "12:00",
            "type": "Intruder",
            "location": "Yard",
            "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
        
          },
          {
              "id": 1,
              "date": "2016-09-23",
              "time": "12:00",
              "type": "Intruder",
              "location": "Yard",
              "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
          
            },
            {
              "id": 1,
              "date": "2016-09-23",
              "time": "12:00",
              "type": "Intruder",
              "location": "Yard",
              "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
          
            },
            {
              "id": 1,
              "date": "2016-09-23",
              "time": "12:00",
              "type": "Intruder",
              "location": "Yard",
              "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
          
            },
            {
                "id": 1,
                "date": "2016-09-23",
                "time": "12:00",
                "type": "Intruder",
                "location": "Yard",
                "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
            
              },
              {
                  "id": 1,
                  "date": "2016-09-23",
                  "time": "12:00",
                  "type": "Intruder",
                  "location": "Yard",
                  "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
              
                },
                {
                  "id": 1,
                  "date": "2016-09-23",
                  "time": "12:00",
                  "type": "Intruder",
                  "location": "Yard",
                  "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
              
                },
                {
                  "id": 1,
                  "date": "2016-09-23",
                  "time": "12:00",
                  "type": "Intruder",
                  "location": "Yard",
                  "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
              
                },
                {
                    "id": 1,
                    "date": "2016-09-23",
                    "time": "12:00",
                    "type": "Intruder",
                    "location": "Yard",
                    "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                
                  },
                  {
                      "id": 1,
                      "date": "2016-09-23",
                      "time": "12:00",
                      "type": "Intruder",
                      "location": "Yard",
                      "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                  
                    },
                    {
                      "id": 1,
                      "date": "2016-09-23",
                      "time": "12:00",
                      "type": "Intruder",
                      "location": "Yard",
                      "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                  
                    },
                    {
                      "id": 1,
                      "date": "2016-09-23",
                      "time": "12:00",
                      "type": "Intruder",
                      "location": "Yard",
                      "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                  
                    },
                    {
                        "id": 1,
                        "date": "2016-09-23",
                        "time": "12:00",
                        "type": "Intruder",
                        "location": "Yard",
                        "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                    
                      },
                      {
                          "id": 1,
                          "date": "2016-09-23",
                          "time": "12:00",
                          "type": "Intruder",
                          "location": "Yard",
                          "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                      
                        },
                        {
                          "id": 1,
                          "date": "2016-09-23",
                          "time": "12:00",
                          "type": "Intruder",
                          "location": "Yard",
                          "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                      
                        },
                        {
                          "id": 1,
                          "date": "2016-09-23",
                          "time": "12:00",
                          "type": "Intruder",
                          "location": "Yard",
                          "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                      
                        },
                        {
                            "id": 1,
                            "date": "2016-09-23",
                            "time": "12:00",
                            "type": "Intruder",
                            "location": "Yard",
                            "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                        
                          },
                          {
                              "id": 1,
                              "date": "2016-09-23",
                              "time": "12:00",
                              "type": "Intruder",
                              "location": "Yard",
                              "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                          
                            },
                            {
                              "id": 1,
                              "date": "2016-09-23",
                              "time": "12:00",
                              "type": "Intruder",
                              "location": "Yard",
                              "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                          
                            },
                            {
                              "id": 1,
                              "date": "2016-09-23",
                              "time": "12:00",
                              "type": "Intruder",
                              "location": "Yard",
                              "url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4"
                          
                            }
]

class HistoricalVideo extends Component{
    constructor(){
        super()
        this.state ={
            dateFilter : [],
            displayData : [],
            startTimeFilter : [],
            endTimeFilter : [],
            videoTypeFilter : [],
            cameraLocation : [],
            loaded : false
        }
        this.handleClearDateFilter = this.handleClearDateFilter.bind(this)
        this.handleChangeDateFilter = this.handleChangeDateFilter.bind(this)
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this)
        this.handleClearStartTime = this.handleClearStartTime.bind(this)
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this)
        this.handleClearEndTime = this.handleClearEndTime.bind(this)
        this.handleChangeVideoType = this.handleChangeVideoType.bind(this)
        this.handleChangeCameraLocation = this.handleChangeCameraLocation.bind(this)
        //this.applyFilter = this.applyFilter.bind(this)
    }

    

    applyFilter(){
        let array = data
        //console.log(this.state.dateFilter.length)
        if(this.state.dateFilter.length===2){
            //console.log("here")
            
           array = array.filter((item) =>{
                let date = new Date(item.date)
                return this.state.dateFilter[0]<=date &&date<=this.state.dateFilter[1]
           }) 
        }

        
        if(this.state.startTimeFilter.length!==0){
            this.state.startTimeFilter[0].setSeconds(0)
            //console.log(this.state.startTimeFilter[0])
            array = array.filter((item) =>{
                let date = new Date()
                date.setHours(parseInt(item.time.split(":")[0]),parseInt(item.time.split(":")[1]),0)
                //console.log(this.state.startTimeFilter[0])
                //console.log(date)
                return this.state.startTimeFilter[0].getTime()<=date.getTime()
           })
        }

        if(this.state.endTimeFilter.length!==0){
            this.state.endTimeFilter[0].setSeconds(0)
            //console.log(this.state.startTimeFilter[0])
            array = array.filter((item) =>{
                let date = new Date()
                date.setHours(parseInt(item.time.split(":")[0]),parseInt(item.time.split(":")[1]),0)
                //console.log(this.state.startTimeFilter[0])
                //console.log(date)
                return this.state.endTimeFilter[0].getTime()>=date.getTime()
           })
        }

        if(this.state.videoTypeFilter.length!==0){
            array = array.filter((item) =>{
                return this.state.videoTypeFilter.includes(item.type)
            })
        }

        if(this.state.cameraLocation.length!==0){
            array = array.filter((item) =>{
                return this.state.cameraLocation.includes(item.location)
            })
        }
        //console.log(array)

        this.setState({     
            displayData : array    
        });
        

    }

    handleClearDateFilter(){
        this.setState({     
            dateFilter : []    
        }, this.applyFilter);
        
        
    }

    handleChangeDateFilter(value){
        this.setState({     
            dateFilter : value    
        }, this.applyFilter);
        //console.log(value)
        

    }

    handleChangeStartTime(value){
        this.setState({startTimeFilter : [value]}, this.applyFilter)
        
    }

    handleClearStartTime(){
        this.setState({startTimeFilter : []}, this.applyFilter)
    }

    handleChangeEndTime(value){
        this.setState({endTimeFilter : [value]}, this.applyFilter)
        
    }

    handleClearEndTime(){
        this.setState({endTimeFilter : []}, this.applyFilter)
    }

    handleChangeVideoType(value, event){
        this.setState({videoTypeFilter : value}, this.applyFilter)
        //console.log(value)
    }

    handleChangeCameraLocation(value, event){
        this.setState({cameraLocation : value}, this.applyFilter)

    }
    componentDidMount() {
        console.log("here")
        let settings = {
           params: { user_id : 'demo1'},
           headers :{'Content-Type' : 'application/json'}
          }
        // fetch('https://aprebrte8g.execute-api.af-south-1.amazonaws.com/beta/storage/video?user_id=demo1', {
        //   mode: 'no-cors' // 'cors' by default
        // })
        // .then(function(response) {
        //   console.log(response)
        //   // Do something with response
        // }).then((data) => console.log('This is your data', data)).catch((err)=>console.log(err));
        getVideos(settings, (res)=>console.log(res), (err)=>console.log(err))
        this.setState({loaded : true, displayData : data})
    }


    render(){
        //console.log("hello")
        if(this.state.loaded)
            return(
                
                    <Grid fluid>
                        <Row fluid className="show-grid" gutter={10}>
                            <Col xs={8} >
                                <PanelGroup accordion bordered>
                                    <Panel header="Video Type Filter">
                                        <CheckPicker
                                            sticky
                                            data={VideoTypes}
                                            style={{ width: 224 }}
                                            onChange={this.handleChangeVideoType}
                                        />

                                    
                                    </Panel>
                                    <Panel header="Date Filter">                            
                                        <DateRangePicker 
                                            onClean ={this.handleClearDateFilter}
                                            onChange = {this.handleChangeDateFilter}
                                        />             
                                    </Panel>
                                    <Panel header="Time Filter">
                                        <InputGroup>
                                            <DatePicker
                                                format="HH:mm" block appearance="subtle" 
                                                onChange =  {this.handleChangeStartTime}
                                                onClean = {this.handleClearStartTime}
                                            />
                                            <InputGroup.Addon>to</InputGroup.Addon>
                                            <DatePicker
                                                format="HH:mm" block appearance="subtle" 
                                                onChange =  {this.handleChangeEndTime}
                                                onClean = {this.handleClearEndTime}
                                            />
                                        </InputGroup>
                                    </Panel>
                                    <Panel header="Camera Location Filter">
                                    <CheckPicker
                                            sticky
                                            data={CameraLocations}
                                            style={{ width: 224 }}
                                            onChange={this.handleChangeCameraLocation}
                                        />
                                    </Panel>
                                </PanelGroup>
                            </Col>
                            <Col xs={16} >
                                <Panel header="Historical Video List" bordered bodyFill>
                                    <VideoFrameViewer data={this.state.displayData}/>
                                </Panel>
                            </Col>
                            
                        </Row>
                    
                    
                    </Grid>
                
                
            )
        
        return(<Loading />)
    }
    

}

export default HistoricalVideo