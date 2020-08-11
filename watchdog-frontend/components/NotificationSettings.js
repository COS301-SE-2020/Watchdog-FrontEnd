import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {Divider,Radio,RadioGroup, Form, Row, Panel, FlexboxGrid} from 'rsuite'
import UpdateNotifications from './UpdateNotifications'
import {getNotificationSettings} from '../api/api'
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
            number: "",
            security_company : ""
        }

        this.getCurrentSettings = this.getCurrentSettings.bind(this)
        this.setSettings = this.setSettings.bind(this)
    }

    getCurrentSettings(){

    }

    setSettings(settings){
        // if(settings.type=="email"){
        //     let value= settings.value
        // }
        
        this.setState({type: settings.type,
        security_company : settings.security})

    }
    componentDidMount(){
        getNotificationSettings({},this.setSettings)
    }
    render(){
        return(
            <Panel header={<h3>Notification Settings</h3>} shaded bodyFill>
                <Panel  shaded header={<h4>Current Notification Settings</h4>}>
                    
                    <h5>Notification type: {this.state.type}</h5>
                    {this.state.security_company !==""&&<h5>Security Company: {this.state.security_company}</h5>}
                    {this.state.security_company ==""&&<h5>Security Company Number not set</h5>}
                </Panel>
                <Divider />
                <UpdateNotifications update_settings = {this.setSettings} current_security={this.state.security_company}/>
            </Panel>
        )
    }
}
export default NotificationView