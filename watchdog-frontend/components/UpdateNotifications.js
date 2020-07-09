import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {InputPicker,Input,FormGroup, Form, Button, Panel, FlexboxGrid} from 'rsuite'
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
            select : "non"
        }

        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    handleOptionChange(val, el){
        console.log(val)
        this.setState({select: val})
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
                            
                            <Input style={{ width: 300 }} placeholder="Email" />
                        </FormGroup>
                    }
                    {this.state.select==="SMS"&&
                        <FormGroup>
                            
                            <Input style={{ width: 300 }} placeholder="Phone Number" />
                        </FormGroup>
                    }
                    <Button appearance="primary">Submit</Button>
                    
                </Form>
            
            
            </Panel>
        )
    }
}
export default UpdateNotifications