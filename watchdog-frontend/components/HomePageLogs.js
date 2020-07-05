import React, { Component } from 'react'
import {FlexboxGrid,SelectPicker,Button,Alert,Panel, IconButton,Table,Icon, Grid, Row,Avatar,Col,Modal,Popover,Whisper} from 'rsuite'
// import Col from 'rsuite/lib/Carousel';
const { Column, HeaderCell, Cell, Pagination } = Table;
const logs=[
    {
        "id": "1",
        "date": "16-12-2020",
        'time': '11:45',
        'log_message': 'An intruder was detected. A notification was sent to your security company'

    },
    {
        "id": "2",
        "date": "22-11-2020",
        'time': '8:45',
        'log_message': 'An intruder was detected. A notification was sent to your security company'
    },
    {
        "id": "3",
        "date": "23-12-2020",
        'time': '9:45',
        'log_message': 'Movement was detected. A notification was sent to you'
    },
    {
        "id": "3",
        "date": "23-12-2020",
        'time': '9:45',
        'log_message': 'Movement was detected. A notification was sent to you'
    }  
]
class Log extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <Panel header="Camera Logs" bordered bodyFill align='center'>
                <Table
                virtualized
                height={400}
                data={logs}
                fluid
                onRowClick={data => {
                console.log(data);
                }}
            >
                <Column flexGrow={0.2} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
                </Column>
    
                <Column flexGrow={0.5}>
                <HeaderCell>Date</HeaderCell>
                <Cell dataKey="date" />
                </Column>

                <Column flexGrow={0.5}>
                <HeaderCell>Time</HeaderCell>
                <Cell dataKey="time" />
                </Column>

                <Column flexGrow={2}>
                <HeaderCell>Message</HeaderCell>
                <Cell dataKey="log_message" />
                </Column>
    
            </Table>
          </Panel>
        )
    }
}
export default Log