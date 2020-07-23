import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {InputPicker,Input,FormGroup, Form, Button, Panel, FlexboxGrid} from 'rsuite'
import {updateNotification} from '../api/api'
const notifications=
    {
        "type":"email",
        "email": "email@test.com",
        "number": ""
    }

const options_data = [{
    "label": "Email",
    "value": "Email",
    
  },
  {
    "label": "SMS",
    "value": "SMS",
    
  },
  {
    "label": "Push Notifications",
    "value": "Push_Notifications",
    
  }]
class UpdateNotifications extends Component{
    constructor(){
        super()
        this.state ={
            select : "non",
            email : "",
            sms : "",
            security_company : ""
        }

        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.submitSettings = this.submitSettings.bind(this)
    }

    handleOptionChange(val, el){
        console.log(val)
        this.setState({select: val})
    }

    submitSettings(){
        let set ={
            type : this.state.select,
            email : this.state.email,
            number : this.state.sms,
            security : this.state.security_company
        }

        updateNotification(set, this.props.update_settings)

        this.setState({
            select : "non",
            email : "",
            sms : "",
            security_company : ""})

        //this.props.update_settings(set)

    }
    render(){
        return(
            <Panel  shaded header={<h4>Update Notification Settings</h4>}>
                <Form>
                    <FormGroup>
                        <InputPicker onChange={this.handleOptionChange}  data={options_data} style={{ width: 224 }} />
                        
                    </FormGroup>
                    {this.state.select==="Email"&&
                        <FormGroup>
                            
                            <Input value = {this.state.email} onChange ={(val)=>this.setState({email : val})} style={{ width: 300 }} placeholder="Email" />
                        </FormGroup>
                    }
                    {this.state.select==="SMS"&&
                        <FormGroup>
                            
                            <Input value = {this.state.sms} onChange ={(val)=>this.setState({sms : val})} style={{ width: 300 }} placeholder="Phone Number" />
                        </FormGroup>
                    }
                    <FormGroup>
                    <Input value = {this.state.security_company} onChange ={(val)=>this.setState({security_company : val})} style={{ width: 300 }} placeholder="Security Company Phone Number" />
                        
                    </FormGroup>
                    <Button onClick={this.submitSettings} appearance="primary">Submit</Button>
                    
                </Form>
            
            
            </Panel>
        )
    }
}
export default UpdateNotifications