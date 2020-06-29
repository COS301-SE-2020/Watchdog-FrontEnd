import React, { Component } from 'react'
import {Panel, PanelGroup, DateRangePicker} from 'rsuite'

class VideoFilterForm extends Component{
    constructor(){
        super()
        this.state ={
            dateFilter : true
        }
    }
    
    render(){

        return(
            <PanelGroup accordion bordered>
                <Panel header="Video Type Filter">
                    <Paragraph>
                        <DateRangePicker />
                    </Paragraph>
                    

                
                </Panel>
                <Panel header="Date Filter">
                
                </Panel>
                <Panel header="Time Filter">
                
                </Panel>
                <Panel header="Camera Location Filter">
                
                </Panel>
          </PanelGroup>

        )

    }
}

export default VideoFilterForm