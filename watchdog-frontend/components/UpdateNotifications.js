import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {SelectPicker,Input,FormGroup, Form, Button, Panel, FlexboxGrid} from 'rsuite'
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
            security : this.state.security_company
        }

        updateNotification(set, this.props.update_settings)

        this.setState({
            select : "non",
            security_company : ""})

        //this.props.update_settings(set)

    }
    render(){
        return(
            <Panel style={{textAlign : 'center'}}  shaded header={<h4>Update Notification Settings</h4>}>
                <Form>
                    <FormGroup>
                        <SelectPicker searchable={false} onChange={this.handleOptionChange}  data={options_data} style={{ width: 224 }} />
                        
                    </FormGroup>
                    {this.state.select==="Email"
                    }
                    {this.state.select==="SMS"
                        
                    }
                    <FormGroup>
                    <Input defaultValue={this.props.current_security} value = {this.state.security_company} onChange ={(val)=>this.setState({security_company : val})} style={{ width: 224 }} placeholder="Security Company Phone Number" />
                        
                    </FormGroup>
                    <Button onClick={this.submitSettings} color='green' appearance="primary">Submit</Button>
                    
                </Form>
            
            
            </Panel>
        )
    }
}
export default UpdateNotifications