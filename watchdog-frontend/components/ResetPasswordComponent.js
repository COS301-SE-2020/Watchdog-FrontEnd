import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {FormGroup,Form,FormControl,HelpBlock,ControlLabel,Button,ButtonToolbar} from 'rsuite'

class Pass extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <Form layout='horizontal'>
    <FormGroup>
      <ControlLabel>Current Password</ControlLabel>
      <FormControl name="password" type="password"  />
      <HelpBlock tooltip>Required</HelpBlock>
    </FormGroup>
    <FormGroup>
      <ControlLabel>New Password</ControlLabel>
      <FormControl name="password" type="password" />
      <HelpBlock tooltip>Required</HelpBlock>
    </FormGroup>
    <FormGroup>
      <ControlLabel>Re-type New Password</ControlLabel>
      <FormControl name="password" type="password" />
      <HelpBlock tooltip>Required</HelpBlock>
    </FormGroup>
    
    <FormGroup>
      <ButtonToolbar>
        <Button appearance="primary">Submit</Button>
      </ButtonToolbar>
    </FormGroup>
  </Form>
        )
    }
}
export default Pass