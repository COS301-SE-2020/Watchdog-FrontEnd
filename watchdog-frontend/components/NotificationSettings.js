import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {Divider,Radio,RadioGroup, Form, Row, Panel, FlexboxGrid} from 'rsuite'
import UpdateNotifications from './UpdateNotifications'
const notifications=
    {
        type:"Email",
        email: "email@test.com",
        number: ""
    }

class NotificationView extends Component{
    constructor(){
        super()
        this.state ={
            type:"Email",
            email: "email@test.com",
            number: ""
        }
    }
    render(){
        return(
            <Panel header={<h3>Notification Settings</h3>} shaded bodyFill>
                <Panel  shaded header={<h4>Current Notification Settings</h4>}>
                    
                    <h5>Notification type: {this.state.type}</h5>
                    {this.state.type==="Email"&&<h5>Email: {this.state.email}</h5>}
                    {this.state.type==="SMS"&&<h5>Number: {this.state.number}</h5>}
                </Panel>
                <Divider />
                <UpdateNotifications />
            </Panel>
        )
    }
}
export default NotificationView