import React, { Component } from 'react'
import {FlexboxGrid,SelectPicker,Button,Alert,Panel, IconButton,Table,Icon, Grid, Row,Avatar,Col,Modal,Popover,Whisper} from 'rsuite'
// import Col from 'rsuite/lib/Carousel';
import {getLogs} from '../api/api'
const { Column, HeaderCell, Cell, Pagination } = Table;
// let logs=[
//     {
//         "id": "1",
//         "date": "16-12-2020",
//         'time': '11:45',
//         'log_message': 'An intruder was detected. A notification was sent to your security company'

//     },
//     {
//         "id": "2",
//         "date": "22-11-2020",
//         'time': '8:45',
//         'log_message': 'An intruder was detected. A notification was sent to your security company'
//     },
//     {
//         "id": "3",
//         "date": "23-12-2020",
//         'time': '9:45',
//         'log_message': 'Movement was detected. A notification was sent to you'
//     },
//     {
//         "id": "3",
//         "date": "23-12-2020",
//         'time': '9:45',
//         'log_message': 'Movement was detected. A notification was sent to you'
//     }  
// ]
class Log extends Component{
    constructor(){
        super()
        this.state={
            logs :""
        }
        this.setLogs=this.setLogs.bind(this)
    }
    setLogs(val){
        let result = val.map((item, index)=>{
            let message = item.message
            let date = new Date(item.timestamp * 1000)
            let  utcString = date.toUTCString()
            let  time = date.toTimeString()
            time = time.split(' ')[0]
            let new_element =  {
                "message" : message,
                "date": date.toISOString().slice(0,10),
                "time": time.substr(0,8)
              }
              return new_element
            })
        // console.log(val)
        this.setState({logs : result}) 
        console.log(this.state.logs)
    }
    componentDidMount(){
        getLogs(this.setLogs)
    }
    render(){
        return(
            <Panel header="Camera Logs" bordered bodyFill align='center'>
                <Table
                virtualized
                height={400}
                data={this.state.logs}
                fluid
                onRowClick={data => {
                console.log(data);
                }}
            >
                <Column flexGrow={0.5} align="center" fixed>
                <HeaderCell>Log Message</HeaderCell>
                <Cell dataKey="message" />
                </Column>
    
                <Column flexGrow={0.5}>
                <HeaderCell>Date</HeaderCell>
                <Cell dataKey="date" />
                </Column>
                
                <Column flexGrow={0.5}>
                <HeaderCell>Time</HeaderCell>
                <Cell dataKey="time" />
                </Column>

                {/* <Column flexGrow={0.5}>
                <HeaderCell>Time</HeaderCell>
                <Cell dataKey="time" />
                </Column>

                <Column flexGrow={2}>
                <HeaderCell style={{textAlign : "left"}} >Message</HeaderCell>
                <Cell style={{textAlign : "left"}} dataKey="log_message" />
                </Column> */}
    
            </Table>
          </Panel>
        )
    }
}
export default Log