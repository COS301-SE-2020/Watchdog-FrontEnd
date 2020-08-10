import React, { Component } from 'react'
import {Panel, PanelGroup, Grid, Row, Col, DateRangePicker, DatePicker, CheckPicker, InputGroup} from 'rsuite'
import VideoFrameViewer from './VideoFrameViewer'
import Loading from './Loading'
import {getVideos} from '../api/api'
import Index from '../pages'
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

class HistoricalVideo extends Component{
    constructor(){
        super()
        this.state ={
            data : [],
            rooms : [],
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

        this.applyFilter = this.applyFilter.bind(this)
    }

    

    applyFilter(){
        let array = this.state.data
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
        
        // fetch('https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/beta/storage/video?user_id=demo1', {
        //   mode: 'no-cors' // 'cors' by default
        // })
        // .then(function(response) {
        //   console.log(response)
        //   // Do something with response
        // }).then((data) => console.log('This is your data', data)).catch((err)=>console.log(err));
        getVideos( (res)=>{
          const videos = res.data.data.videos || []
          let locations = []
          console.log(res)
          let result = videos.map((item, index)=>{
          let location = item.metadata.room||"Unknown"
          locations.push(location.charAt(0).toUpperCase() + location.slice(1))
          let type = item.tag
          let date = new Date(item.metadata.timestamp * 1000)
          let  utcString = date.toUTCString()
          let  time = date.toTimeString()
          time = time.split(' ')[0]
          let new_element =  {
            id : index+1,
            "date": date.toISOString().slice(0,10),
            "time": time.substr(0,8), //(date.getHours()+2) +":"+date.getMinutes(),
            "type": type.charAt(0).toUpperCase() + type.slice(1),
            "location": location.charAt(0).toUpperCase() + location.slice(1),
            "url": item.path_in_s3
            }
            return new_element
          })
          console.log(result)
          let unique = [...new Set(locations)];
          let filter = unique.map((item)=>{
            let option ={
              "label": item,
              "value": item
            }
            return option
          })
          this.setState({loaded : true, displayData : result, data : result, rooms: filter})
          
        }, (err)=>console.log(err))
        
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
                                    <Panel header="Camera Room Filter">
                                    <CheckPicker
                                            sticky
                                            data={this.state.rooms}
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