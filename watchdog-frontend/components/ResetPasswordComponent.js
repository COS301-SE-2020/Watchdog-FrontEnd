import React, {Component, useEffect} from 'react';
import { render } from 'react-dom';
import {FormGroup,Form,FormControl,FlexboxGrid,ControlLabel,Button,ButtonToolbar, Panel, HelpBlock} from 'rsuite'

class Pass extends Component{
    constructor(){
        super()
    }
    render(){
        return(
          <FlexboxGrid style={{"marginTop":"50px"}} justify="center">
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>Change Password</h3>} bordered>
              <Form fluid>
                <FormGroup>
                  <ControlLabel>Old Password</ControlLabel>
                  <FormControl name="password" type="password" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>New Password</ControlLabel>
                  <FormControl name="password" type="password" />
                  <HelpBlock tooltip>Password must be 8 characters long, contain: an uppercase character, a number and a special character</HelpBlock>
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button appearance="primary">Change Password</Button>
                  
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
            // <Form layout='horizontal'>
            //   <FormGroup>
            //     <ControlLabel>Current Password</ControlLabel>
            //     <FormControl name="password" type="password"  />
            //     <HelpBlock tooltip>Required</HelpBlock>
            //   </FormGroup>
            //   <FormGroup>
            //     <ControlLabel>New Password</ControlLabel>
            //     <FormControl name="password" type="password" />
            //     <HelpBlock tooltip>Required</HelpBlock>
            //   </FormGroup>
            //   <FormGroup>
            //     <ControlLabel>Re-type New Password</ControlLabel>
            //     <FormControl name="password" type="password" />
            //     <HelpBlock tooltip>Required</HelpBlock>
            //   </FormGroup>
              
            //   <FormGroup>
            //     <ButtonToolbar>
            //       <Button appearance="primary">Submit</Button>
            //     </ButtonToolbar>
            //   </FormGroup>
            // </Form>
        )
    }
}
export default Pass