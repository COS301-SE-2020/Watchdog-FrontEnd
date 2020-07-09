import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {FormGroup,Radio,RadioGroup, Form, Row, Panel, FlexboxGrid} from 'rsuite'
const notifications=
    {
        "type":"email",
        "email": "email@test.com",
        "number": ""
    }

class NotificationView extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <Panel  bordered>
                <div><h3>Notification Settings</h3></div>
            <div><h4>Currently Active: {notifications.type}</h4></div>
            <div>Email: {notifications.email}</div>
            <div>Number: {notifications.number}</div>
            </Panel>
        )
    }
}
export default NotificationView