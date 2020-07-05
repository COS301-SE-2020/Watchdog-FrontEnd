import React, {Component} from 'react'
import {Table, Badge, Panel} from 'rsuite'
const { Column, HeaderCell, Cell, Pagination } = Table;

const cameras=[
    {
        "cam_id": "1",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Yard",
        "status":  <Badge content="online" style={{ background: '#4caf50' }} />
        },
        {
        "cam_id": "2",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status":  <Badge content="online" style={{ background: '#4caf50' }} />
        },
        {
        "cam_id": "3",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status": <Badge content="online" style={{ background: '#4caf50' }} />
        },
        {
        "cam_id": "4",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status": <Badge content="online" style={{ background: '#4caf50' }} />
        }
        ,
        {
        "cam_id": "4",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status": <Badge content="online" style={{ background: '#4caf50' }} />
        },
        {
        "cam_id": "4",
        "cam_url": "https://s3.af-south-1.amazonaws.com/watchdog.uservideocontent/video/Chelsea+2-1+Manchester+City+_+Pulisic+%26+Willian+Seal+Dramatic+Victory+_+Premier+League+Highlights.mp4",
        "cam_location": "Kitchen",
        "status": <Badge content="online" style={{ background: '#4caf50' }} />
        }
  ]

class CameraStatusTable extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <Panel header="Historical Video List" bordered bodyFill>
                <Table
                virtualized
                height={400}
                data={cameras}
                fluid
                onRowClick={data => {
                console.log(data);
                }}
            >
                <Column flexGrow={0.5} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="cam_id" />
                </Column>
    
                <Column flexGrow={1}>
                <HeaderCell>Location</HeaderCell>
                <Cell dataKey="cam_location" />
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